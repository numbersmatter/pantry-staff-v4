import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { TasksOnDayCard } from "./componets/tasks-on-day-card";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);



  // const taskSteps = await getTaskSteps()

  return json({});
};



export default function Index() {
  return (
    <>
      <TasksOnDayCard />
    </>
  );
}