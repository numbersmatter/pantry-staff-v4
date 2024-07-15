import { json, redirect } from "@remix-run/node";
import { QueryStringRecord, serialize, withSchema } from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";
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
  actionType: z.literal("applyServiceList"),
  serviceListID: z.string().length(20),
});

const mutation = (staff: { staff_id: string; staff_name: string }) =>
  withSchema(ApplyScheme)(async (values) => {
    const serviceList = await db.service_lists.read(values.serviceListID);
    if (!serviceList) {
      throw new Response("Service List not found", { status: 404 });
    }

    const transactionValue = calculateTotalValue(serviceList.service_items);

    const transaction_promises = serviceList.seats_array.map(async (seatId) => {
      // create transaction
      const transactionData: ServiceTransaction = {
        service_type: serviceList.service_type as ServiceTransactionType,
        status: "pending",
        delivered_to: seatId,
        service_created_data: new Date(),
        service_updated_date: new Date(),
        id: "",
        service_period_id: serviceList.service_period_id,
        value: transactionValue,
      };
      const transactionId = await db.service_transactions.create(
        transactionData
      );

      return {
        seat_id: seatId,
        transactionId,
        value: transactionValue,
      };
    });

    const transactions = await Promise.all(transaction_promises);

    const bulk_action_id = await db.bulk_list_actions.create({
      service_list_id: values.serviceListID,
      records_created: transactions,
      records_updated: [],
      records_canceled: [],
      records_unchanged: [],
      seats_array: serviceList.seats_array,
      line_items: serviceList.service_items,
      staff,
    });

    await db.service_lists.update(values.serviceListID, { status: "applied" });

    return {
      transactions,
      service_list_id: values.serviceListID,
      bulk_action_id,
    };
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
