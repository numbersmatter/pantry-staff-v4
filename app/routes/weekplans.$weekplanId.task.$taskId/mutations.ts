import { json, redirect } from "@remix-run/node";
import { QueryStringRecord, serialize, withSchema } from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";
import { TaskDay, WeekPlan } from "~/lib/database/weekplan/types";

const GoToDaySchema = z.object({
  type: z.literal("go_to_day"),
  taskId: z.string().min(3).max(30),
  weekplanId: z.string().length(20),
});

const ToggleCompleteSchema = z.object({
  type: z.literal("toggle_complete"),
  taskId: z.string().min(3).max(30),
  weekplanId: z.string().length(20),
  markValue: z.enum(["complete", "incomplete"]),
});

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const findTaskDay = async ({
  weekplan,
  taskId,
}: {
  weekplan: WeekPlan;
  taskId: string;
}) => {
  const taskDay = weekplan.taskDay;
  const day = days.find((day) =>
    taskDay[day as keyof TaskDay].includes(taskId)
  );
  return day;
};

const checkTaskIdValid = ({
  taskId,
  weekplan,
}: {
  taskId: string;
  weekplan: WeekPlan;
}) => {
  const tasks = weekplan.tasks;
  return Object.keys(tasks).includes(taskId);
};

const goToDayMutation = withSchema(GoToDaySchema)(async (values) => {
  const taskId = values.taskId;
  const weekplanId = values.weekplanId;
  const weekplan = await db.weekplan.read(weekplanId);
  if (!weekplan) {
    throw new Error("Weekplan not found");
  }
  const day = await findTaskDay({ weekplan, taskId });
  if (!day) {
    return "weekOverview";
  }
  return day;
});

export const goToDay = async (formInput: QueryStringRecord) => {
  const result = await goToDayMutation(formInput);
  if (!result.success) {
    const serializedResult = serialize(result);
    return json(
      {
        success: false,
        errors: serializedResult.errors,
      },
      { status: 400 }
    );
  }

  const day = result.data;

  if (day === "weekOverview") {
    return redirect(`/weekplans/${formInput.weekplanId}`);
  }

  return redirect(`/weekplans/${formInput.weekplanId}/day/${day}`);
};

const toggleCompleteMutation = withSchema(ToggleCompleteSchema)(
  async (values) => {
    const taskId = values.taskId;
    const weekplanId = values.weekplanId;
    const weekplan = await db.weekplan.read(weekplanId);
    if (!weekplan) {
      throw new Error("Weekplan not found");
    }
    const validId = checkTaskIdValid({ taskId, weekplan });

    if (!validId) {
      return "invalid";
    }
    const currentStatus = weekplan.taskEntry[taskId] === "complete";
    const submitStatus = values.markValue === "complete";

    const statusMatch = currentStatus === submitStatus;
    if (statusMatch) {
      return "noChange";
    }

    const toggle = await db.weekplan.toggleTaskComplete({
      weekplanId,
      taskId,
      status: values.markValue,
    });

    return toggle;
  }
);

export const toggleComplete = async (formInput: QueryStringRecord) => {
  const result = await toggleCompleteMutation(formInput);
  if (!result.success) {
    const serializedResult = serialize(result);
    return json(
      {
        success: false,
        errors: serializedResult.errors,
      },
      { status: 400 }
    );
  }

  if (result.data === "invalid") {
    return json({
      success: false,
      errors: ["Invalid task id"],
    });
  }

  if (result.data === "noChange") {
    return json({
      success: false,
      errors: ["No change was made"],
    });
  }

  return json({
    success: true,
    errors: [],
  });
};
