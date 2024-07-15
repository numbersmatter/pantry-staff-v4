import { redirect } from "@remix-run/node";
import { db } from "~/lib/database/firestore.server";
import { ServiceList } from "~/lib/database/service-lists/types";

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

const getHistoryData = async (list: ServiceList) => {
  const list_actions = await db.bulk_list_actions.ofServiceList(list.id);

  const listData = list_actions
    .sort((a, b) => b.created_date.valueOf() - a.created_date.valueOf())
    .map((action) => {
      return {
        created_date: new Date(action.created_date).toDateString(),
        id: action.id,
        records_created: action.records_created.length,
        records_updated: action.records_updated.length,
        records_canceled: action.records_canceled.length,
        records_unchanged: action.records_unchanged.length,
      };
    });

  return listData;
};

export { checkListStatus, getHistoryData };
