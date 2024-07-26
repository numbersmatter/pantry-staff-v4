import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { TasksOnDayCard } from "./componets/tasks-on-day-card";
import { checkDayIsValid } from "./data-fetchers";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const dayParam = params.day ?? "day";

  const day = checkDayIsValid(dayParam);




  // const taskSteps = await getTaskSteps()

  return json({ day });
};



export default function Index() {
  return (
    <>
      <TasksOnDayCard />
    </>
  );
}