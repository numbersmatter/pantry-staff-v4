import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getColumnData, getCurrentPeriod, getProgramData } from "./data-fetchers";
import { inputFromForm } from "composable-functions";
import ProgramCard from "./components/program_card";
import ServicePeriodTable from "./components/service-periods-table";
import { createServicePeriod } from "./mutations";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const programId = params.programId ?? "programId";
  const program = await getProgramData(programId);
  const columnData = await getColumnData(programId);
  return json({ program, columnData });
};



export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const programId = params.programId ?? "programId";
  const formInput = await inputFromForm(request);

  const action = formInput["_action"] as string;

  if (action === "goToPeriod") {
    const currentPeriod = await getCurrentPeriod(programId);
    return redirect(`/service-periods/${currentPeriod}`);
  }

  if (action === "createPeriod") {
    return await createServicePeriod({ formInput });
  }

  return null;
};


export default function ProgramsId() {
  const data = useLoaderData();
  return (
    <>
      <ProgramCard />
      <ServicePeriodTable />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
