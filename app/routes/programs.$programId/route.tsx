import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getCurrentPeriod } from "./data-fetchers";
import { inputFromForm } from "composable-functions";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  return json({});
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
  return (
    <div>
      <h1>ProgramsId</h1>
    </div>
  )
}
