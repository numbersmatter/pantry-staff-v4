import { db } from "~/lib/database/firestore.server";

const getPreviewData = async (listId: string) => {
  const list = await db.service_lists.read(listId);
  if (!list) {
    throw new Error(`List with id ${listId} not found`);
  }

  return {
    serviceType: "Food Pickup Transactions",
    numberOfRecords: list.seats_array.length,
    title: list.name,
  };
};

export { getPreviewData };
