import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getFamiliesWithSeatsData, getSeatData } from "./data-fetchers";
import { SeatsTable } from "./components/seats-table";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  let periodId = params.periodId ?? "periodId";

  const seatData = await getSeatData(periodId);
  const families = await getFamiliesWithSeatsData(periodId);

  return json({ seatData, families });
};


export default function ServicePeriodsPeriodIdSeats() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <SeatsTable />
    </>
  );
}
