import { db } from "~/lib/database/firestore.server";

const getPageData = async (listId: string) => {
  const list = await db.service_lists.read(listId);
  if (!list) {
    throw new Error(`List with id ${listId} not found`);
  }

  const taskMenu = {
    name: "Service List",
    links: [
      {
        name: "Service Items",
        to: `/service-lists/${listId}/menu`,
        end: true,
      },
      {
        name: "Seats",
        to: `/service-lists/${listId}/seats`,
        end: true,
      },
      {
        name: "Preview",
        to: `/service-lists/${listId}/preview`,
        end: true,
      },
    ],
  };
  const listName = `Service List: ${list.name}`;
  const servicePeriod = list.service_period.name;

  const headerData = {
    title: listName,
    servicePeriod: servicePeriod,
    status: list.status,
  };

  const showMenu = list.status === "preparing";
  return {
    taskMenu,
    headerData,
    showMenu,
  };
};

export { getPageData };
