import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs
} from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { MenuCard } from "./components/menu-card";
import { getServiceListData } from "./data-fetchers";

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
  return json({
    success: false,
    errorObject: {
      requestAction: "Invalid Request Action"
    },
    inputErrors: [],
    type: "invalidRequestAction"
  })
};


export default function ServiceListPage() {
  return (
    <>
      <MenuCard />
    </>
  );
}
