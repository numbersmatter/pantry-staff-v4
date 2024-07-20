import { json } from "@remix-run/react"
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { UpdateSeatsTable } from "./componets/seats-table";
import { getServiceListUpdateSeatsData } from "./data-fetchers";
import { inputFromForm } from "composable-functions";
import { addSeat, removeSeat } from "./mutations";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const listId = params.listId ?? "listID";
  const seatsData = await getServiceListUpdateSeatsData(listId);

  return json({ seatsData });
};


export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const listId = params.listId ?? "listId";
  const formInput = await inputFromForm(request);
  const type = formInput.type;

  if (type === "addSeat") {
    return await addSeat({ listId, formInput });
  }

  if (type === "removeSeat") {
    return await removeSeat({ listId, formInput });
  }

  return json({
    success: false,
    errorObject: { requestAction: "Invalid Request Action" },
    inputErrors: []
  })
};



export default function UpdateServiceList() {
  return (
    <>
      <UpdateSeatsTable />
    </>
  );
}