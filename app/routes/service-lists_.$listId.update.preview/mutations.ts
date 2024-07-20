import { json, redirect } from "@remix-run/node";
import { QueryStringRecord, serialize, withSchema } from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";
import { TransactionRecord } from "~/lib/database/service-lists/list-actions-crud.server";
import { ItemLine } from "~/lib/database/service-lists/types";
import {
  ServiceTransaction,
  ServiceTransactionType,
} from "~/lib/database/service-transactions/types/service-trans-model";

export const calculateTotalValue = (items: ItemLine[]) => {
  return items.reduce((acc, item) => {
    return acc + item.quantity * item.value;
  }, 0);
};

const ApplyScheme = z.object({
  actionType: z.literal("updateServiceList"),
  serviceListID: z.string().length(20),
  last_action_id: z.string().length(20),
});

const mutation = (staff: { staff_id: string; staff_name: string }) =>
  withSchema(ApplyScheme)(async (values) => {
    const serviceList = await db.service_lists.read(values.serviceListID);
    if (!serviceList) {
      throw new Response("Service List not found", { status: 404 });
    }
    const last_action = await db.bulk_list_actions.last_action(
      values.serviceListID
    );

    if (!last_action) {
      throw new Error("No action found");
    }

    if (last_action.id !== values.last_action_id) {
      throw new Error("Last action id does not match");
    }

    const transactionValue = calculateTotalValue(serviceList.service_items);

    const all_transactions = [
      ...last_action.records_created,
      ...last_action.records_updated,
    ];

    const update_records = all_transactions.filter((transaction) => {
      return serviceList.seats_array.includes(transaction.seat_id);
    });

    const update_transactions = update_records.map((transaction) => {
      return {
        seat_id: transaction.seat_id,
        transactionId: transaction.transactionId,
        current_value: transaction.value,
        new_value: calculateTotalValue(serviceList.service_items),
      };
    });

    // go through all transactions and update the value
    const updatePromises = update_transactions.map((update) => {
      db.service_transactions.update(update.transactionId, {
        value: update.new_value,
        memo: `${serviceList.name} ${serviceList.id}`,
      });

      const transaction_record: TransactionRecord = {
        seat_id: update.seat_id,
        transactionId: update.transactionId,
        value: update.new_value,
      };
      return transaction_record;
    });

    const records_updated = await Promise.all(updatePromises);

    const newSeats = serviceList.seats_array.filter((seat_id) => {
      return !all_transactions.some(
        (transaction) => transaction.seat_id === seat_id
      );
    });

    const cancelled_records = all_transactions.filter((transaction) => {
      return !serviceList.seats_array.includes(transaction.seat_id);
    });

    const cancelled_promises = cancelled_records.map((record) => {
      return db.service_transactions.update(record.transactionId, {
        status: "cancelled",
      });
    });

    await Promise.all(cancelled_promises);

    const created_seats_transactions = newSeats.map(async (seat_id) => {
      // create transaction
      const transactionData: ServiceTransaction = {
        service_type: serviceList.service_type as ServiceTransactionType,
        status: "pending",
        delivered_to: seat_id,
        service_created_data: new Date(),
        service_updated_date: new Date(),
        id: "",
        service_period_id: serviceList.service_period_id,
        value: transactionValue,
        memo: `${serviceList.name} ${serviceList.id}`,
      };

      const transaction_id = await db.service_transactions.create(
        transactionData
      );

      const transaction_record: TransactionRecord = {
        seat_id: seat_id,
        transactionId: transaction_id,
        value: transactionValue,
      };

      return transaction_record;
    });

    const created_transactions = await Promise.all(created_seats_transactions);

    const bulk_action_id = await db.bulk_list_actions.create({
      service_list_id: values.serviceListID,
      records_created: created_transactions,
      records_updated,
      records_canceled: cancelled_records,
      records_unchanged: [],
      seats_array: serviceList.seats_array,
      line_items: serviceList.service_items,
      staff,
    });

    return { bulk_action_id, service_list_id: values.serviceListID };
  });

const applyServiceList = async ({
  staff,
  formInput,
}: {
  staff: { staff_id: string; staff_name: string };
  formInput: QueryStringRecord;
}) => {
  const result = await mutation(staff)(formInput);

  if (!result.success) {
    const errors = serialize(result);
    return json({ errors });
  }

  const listId = result.data.service_list_id;
  return redirect(`/service-lists/${listId}`);
};

export { applyServiceList };
