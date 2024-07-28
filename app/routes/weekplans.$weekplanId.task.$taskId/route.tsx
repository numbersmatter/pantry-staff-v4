import { json } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getTaskData } from "./data-fetchers";
import { TaskCard } from "./components/task-card";
import { inputFromForm } from "composable-functions";
import { goToDay, toggleComplete, updateNumberEntry } from "./mutations";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const taskId = params.taskId ?? "taskId";
  const weekplanId = params.weekplanId ?? "weekplanId";
  const taskData = await getTaskData({ taskId, weekplanId });

  return json({ weekplanId, taskId, ...taskData });
};


export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);

  const type = formInput.type ?? "noAction";

  if (type === "noAction") {
    return json({
      success: false,
      errors: [{
        message: "No valid action type provided",
        name: "ActionTypeError",
        path: ["type"],
      }],
    },
      { status: 400 }
    );
  }

  if (type === "go_to_day") {
    return await goToDay(formInput);
  }

  if (type === "toggle_complete") {
    return await toggleComplete(formInput);
  }

  if (type === "update_number") {
    return await updateNumberEntry(formInput);
  }

  return json({
    success: false,
    errors: [{
      message: "No valid action type provided",
      name: "ActionTypeError",
      path: ["type"],
    }],
  },
    { status: 400 }
  );
};



export default function TaskIdRoute() {

  return (
    <>
      <TaskCard />
    </>
  )
}
