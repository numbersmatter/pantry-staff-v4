import { db } from "~/lib/database/firestore.server";
import { checkTaskComplete } from "~/lib/database/weekplan/util-functions";
import { helperText } from "../weekplans_._index/default-data";





export const getTaskData = async ({
  taskId, weekplanId
}: {
  taskId: string, weekplanId: string
}) => {
  const weekplan = await db.weekplan.read(weekplanId);

  if (!weekplan) {
    throw new Error("Plan not found");
  }

  const dataEntryObj = weekplan.dataEntry;
  const checkoutTruck = dataEntryObj?.["checkout-truck"] as number ?? 0;
  const sendMessage = dataEntryObj?.["send-message"] as string ?? "";

  const defaultDataEntry = {
    "checkout-truck": checkoutTruck,
    "send-message": sendMessage,
  };

  const currentTask = weekplan.tasks?.[taskId] ?? {
    description: "error no task found",
    id: "error",
    title: "Error"
  }


  const helpText = helperText?.[taskId] ?? "";



  const markValue = checkTaskComplete({ weekplan, taskId }) ? "incomplete" : "complete";

  return {
    currentTask,
    defaultDataEntry,
    markValue,
    helperText: helpText
  };
}