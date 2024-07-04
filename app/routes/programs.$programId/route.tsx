import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getCurrentPeriod, getProgramData } from "./data-fetchers";
import { inputFromForm } from "composable-functions";
import ProgramCard from "./components/program_card";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const programId = params.programId ?? "programId";
  const program = await getProgramData(programId);
  return json({ program });
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

  return null;
};


export default function ProgramsId() {
  const data = useLoaderData();
  return (
    <>
      <ProgramCard />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
