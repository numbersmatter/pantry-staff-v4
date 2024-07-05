import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getSeatData } from "./data-fetchers";
import { db } from "~/lib/database/firestore.server";
import { SeatsTable } from "./components/seats-table";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  let periodId = params.periodId ?? "periodId";

  const seatData = await getSeatData(periodId);

  return json({ seatData });
};


export default function ServicePeriodsPeriodIdSeats() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <SeatsTable />
    </div>
  );
}
