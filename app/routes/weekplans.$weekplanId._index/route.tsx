import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import WeekPlan from "../weekplans.$weekplanId/route";
import { WeekPlanStatusCard } from "./components/weekplan-status-card";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  return json({});
};



export default function WeekplanIdIndexRoute() {
  return (
    <>
      <WeekPlanStatusCard />
    </>
  )
}

