import { redirect } from "@remix-run/node";
import { db } from "~/lib/database/firestore.server";
import { calculateTotalValue } from "./mutations";

const getPreviewData = async (listId: string) => {
  const list = await db.service_lists.read(listId);
  if (!list) {
    throw new Error(`List with id ${listId} not found`);
  }

  if (list.status === "preparing") {
    throw redirect(`/service-lists/${listId}/preview`);
  }

  const last_action = await db.bulk_list_actions.last_action(listId);

  if (!last_action) {
    throw new Error("No action found");
  }

  const all_transactions = [
    ...last_action.records_created,
    ...last_action.records_updated,
  ];

  const update_records = all_transactions.filter((transaction) => {
    return list.seats_array.includes(transaction.seat_id);
  });

  const update_transactions = update_records.map((transaction) => {
    return {
      seat_id: transaction.seat_id,
      transactionId: transaction.transactionId,
      current_value: transaction.value,
      new_value: calculateTotalValue(list.service_items),
    };
  });

  const new_records = list.seats_array.filter((seat_id) => {
    return !all_transactions.some(
      (transaction) => transaction.seat_id === seat_id
    );
  });

  const cancelled_records = all_transactions
    .filter((transaction) => {
      return !list.seats_array.includes(transaction.seat_id);
    })
    .map((record) => {
      return {
        seat_id: record.seat_id,
        transactionId: record.transactionId,
        current_value: record.value,
        new_value: 0,
      };
    });

  return {
    serviceType: "Food Pickup Transactions",
    numberOfRecords: list.seats_array.length,
    title: list.name,
    new_records,
    cancelled_records,
    update_transactions,
  };
};

export { getPreviewData };
