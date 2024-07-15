import { db } from "~/lib/database/firestore.server";

const getServiceListData = async (listId: string) => {
  const list = await db.service_lists.read(listId);
  if (!list) {
    throw new Error("Service list not found");
  }

  const menuCardData = {
    name: list.name,
    description: list.description,
  };

  return {
    menuCardData,
    items: list.service_items,
  };
};

export { getServiceListData };
