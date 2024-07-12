import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import { protectedRoute } from "~/lib/auth/auth.server";
import { checkPeriodExists, getFamiliesWithSeatsData } from "./data-fetchers";
import { SeatsTable } from "./components/seats-table";
import { inputFromForm } from "composable-functions";
import { assignFamilyToSeat } from "./mutations";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  let periodId = params.periodId ?? "periodId";
  let period = await checkPeriodExists(periodId);

  const families = await getFamiliesWithSeatsData(periodId);

  return json({ families });
};


export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);
  const formAction = formInput["type"] as string;
  const periodId = params.periodId ?? "periodId";
  // const period = await checkPeriodExists(periodId);

  if (formAction === "assignFamilySeat") {
    return await assignFamilyToSeat(periodId, formInput);
  }


  return json({
    success: false,
    errorObject: {
      requestAction: "Invalid Request Action"
    },
    type: "invalidRequestAction"
  });
};



export default function ServicePeriodsPeriodIdSeats() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <SeatsTable />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
