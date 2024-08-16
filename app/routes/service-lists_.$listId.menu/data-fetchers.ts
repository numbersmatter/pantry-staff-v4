import { db } from "~/lib/database/firestore.server";

const getServiceListData = async (listId: string) => {
  const list = await db.service_lists.read(listId);
  if (!list) {
    throw new Error("Service list not found");
  }

  const listValues = list.service_items.map(
    (item) => item.value * item.quantity
  );

  const listTotalValues = listValues.length > 0
  ? listValues.reduce((acc, value) => acc + value, 0) 
  : [{
    value:0,
    quantity:0,
    item_id: list.id,
    item_name: "Total",
    type: "menu-box",
  }]

  const listTotal = listValues.length > 0 ?
  list.service_items.reduce((acc, item) => {
    const itemTotal = item.value * item.quantity;
    return {
      value: acc.value + itemTotal,
      quantity: acc.quantity + item.quantity,
      item_id: list.id,
      item_name: "Total",
      type: "menu-box",
    };
  })
  :{
    value:0,
    quantity:0,
    item_id: list.id,
    item_name: "Total",
    type: "menu-box",
  }

  const menuCardData = {
    name: list.name,
    description: list.description,
    listTotal,
    listTotalValues,
  };

  return {
    menuCardData,
    items: list.service_items,
    status: list.status,
  };
};

export { getServiceListData };
