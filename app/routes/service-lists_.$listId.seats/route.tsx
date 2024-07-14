import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getServiceListSeatsData } from "./data-fetchers";
import { SeatsTable } from "./componets/seats-table";
import { inputFromForm } from "composable-functions";
import { addSeat, removeSeat } from "./mutations";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);

  const seatsData = await getServiceListSeatsData(params.listId);

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



export default function ServiceListSeatsPage() {
  const { seatsData } = useLoaderData<typeof loader>();
  return (
    <>
      <SeatsTable />
      <pre>{JSON.stringify(seatsData, null, 2)}</pre>
    </>
  )
}

