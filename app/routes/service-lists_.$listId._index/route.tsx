import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs
} from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { MenuCard } from "./components/menu-card";
import { getServiceListData } from "./data-fetchers";
import { inputFromForm } from "composable-functions";
import { addServiceItem, deleteServiceItem, updateServiceItem } from "./mutations";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const listId = params.listId ?? "listId";
  const { menuCardData, items } = await getServiceListData(listId)

  return json({
    menuCardData,
    items,
    listId: listId
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);
  const type = formInput.type;

  if (type === "addItem") {
    console.log("Adding Item")
    return await addServiceItem(formInput);
  }
  if (type === "updateItem") {
    return await updateServiceItem(formInput);
  }

  if (type === "deleteItem") {
    return await deleteServiceItem(formInput);
  }

  return json({
    success: false,
    errorObject: {
      requestAction: "Invalid Request Action"
    },
    inputErrors: [],
    type,
  })
};


export default function ServiceListPage() {
  return (
    <>
      <MenuCard />
    </>
  );
}
