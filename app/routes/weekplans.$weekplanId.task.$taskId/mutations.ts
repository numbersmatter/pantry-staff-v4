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

const UpdateNumberSchema = z.object({
  type: z.literal("update_number"),
  taskId: z.string().min(3).max(30),
  weekplanId: z.string().length(20),
  numberEntered: z.coerce.number(),
});

const UpdateTextSchema = z.object({
  type: z.literal("update_text"),
  taskId: z.string().min(3).max(30),
  weekplanId: z.string().length(20),
  textEntered: z.string().min(0).max(1000),
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
    const errors = serializedResult.errors.map((error) => {
      return {
        message: error.message,
        name: error.name,
        path: error.path,
      };
    });
    return json(
      {
        success: false,
        errors,
      },
      { status: 400 }
    );
  }

  if (result.data === "invalid") {
    return json(
      {
        success: false,
        errors: [
          {
            message: "Invalid task id",
            path: ["taskId"],
            name: "InvalidTaskId",
          },
        ],
      },
      { status: 400 }
    );
  }

  return json({
    success: true,
    errors: [],
  });
};

const updateNumberMutation = withSchema(UpdateNumberSchema)(async (values) => {
  const taskId = values.taskId;
  const weekplanId = values.weekplanId;
  const weekplan = await db.weekplan.read(weekplanId);
  if (!weekplan) {
    throw new Error("Weekplan not found");
  }
  const validId = checkTaskIdValid({ taskId, weekplan });

  if (!validId) {
    throw new Error("Invalid task id");
  }

  const updateData = {
    [`dataEntry.${taskId}`]: values.numberEntered,
  };

  const writeData = await db.weekplan.update({
    weekplanId,
    data: updateData,
  });

  return writeData;
});

export const updateNumberEntry = async (formInput: QueryStringRecord) => {
  const result = await updateNumberMutation(formInput);
  if (!result.success) {
    const serializedResult = serialize(result);

    const errors = serializedResult.errors.map((error) => {
      return {
        message: error.message,
        name: error.name,
        path: error.path,
      };
    });
    return json(
      {
        success: false,
        errors,
      },
      { status: 400 }
    );
  }

  return json({
    success: true,
    errors: [],
  });
};

const updateTextMutation = withSchema(UpdateTextSchema)(async (values) => {
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

  const updateData = {
    [`dataEntry.${taskId}`]: values.textEntered,
  };

  const writeData = await db.weekplan.update({
    weekplanId,
    data: updateData,
  });

  return writeData;
});

export const updateTextEntry = async (formInput: QueryStringRecord) => {
  const result = await updateTextMutation(formInput);
  if (!result.success) {
    const serializedResult = serialize(result);

    const errors = serializedResult.errors.map((error) => {
      return {
        message: error.message,
        name: error.name,
        path: error.path,
      };
    });
    return json(
      {
        success: false,
        errors,
      },
      { status: 400 }
    );
  }

  if (result.data === "invalid") {
    return json(
      {
        success: false,
        errors: [
          {
            message: "Invalid task id",
            path: ["taskId"],
            name: "InvalidTaskId",
          },
        ],
      },
      { status: 400 }
    );
  }

  return json({
    success: true,
    errors: [],
  });
};
