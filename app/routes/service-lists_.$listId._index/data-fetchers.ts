import { redirect } from "@remix-run/node";
import { db } from "~/lib/database/firestore.server";

const checkListStatus = async (listId: string) => {
  const list = await db.service_lists.read(listId);
  if (!list) {
    throw new Error(`List with id ${listId} not found`);
  }

  if (list.status === "preparing") {
    throw redirect(`/service-lists/${listId}/menu`);
  }

  return {
    list,
  };
};

export { checkListStatus };
