import { WeekPlan } from "./types";

export const checkTaskComplete = ({
  taskId,
  weekplan,
}: {
  taskId: string;
  weekplan: WeekPlan;
}) => {
  const taskEntry = weekplan.taskEntry;
  return taskEntry[taskId] === "complete";
};
