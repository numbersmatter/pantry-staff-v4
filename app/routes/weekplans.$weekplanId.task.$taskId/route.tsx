import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getTaskData } from "./data-fetchers";
import { TaskCard } from "./components/task-card";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const taskId = params.taskId ?? "taskId";
  const weekplanId = params.weekplanId ?? "weekplanId";
  const taskData = await getTaskData({ taskId, weekplanId });

  return json({ taskId, ...taskData });
};


export const action = async ({ request }: ActionFunctionArgs) => {
  return json({
    success: true,
    errors: [],
  });
};



export default function TaskIdRoute() {

  return (
    <>
      <TaskCard />
    </>
  )
}
