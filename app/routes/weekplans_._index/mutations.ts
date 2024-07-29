import { db } from "~/lib/database/firestore.server";
import { WeekPlanBase } from "~/lib/database/weekplan/types";
import { foodBoxTasks, taskDay } from "./default-data";
import { QueryStringRecord, serialize, withSchema } from "composable-functions";
import { z } from "zod";
import { json, redirect } from "@remix-run/node";

const CreateWeekPlanSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
});

const writeNewWeekplan = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const planBase: WeekPlanBase = {
    title,
    description,
    tasks: foodBoxTasks,
    taskDay: taskDay,
    taskEntry: {},
    dataEntry: {},
  };

  const planId = await db.weekplan.create(planBase);

  return planId;
};

const createWeekplanMutation = withSchema(CreateWeekPlanSchema)(
  async ({ title, description }) => {
    const weekplanId = await writeNewWeekplan({ title, description });
    return weekplanId;
  }
);

export const createWeekplan = async ({
  formInput,
}: {
  formInput: QueryStringRecord;
}) => {
  const result = await createWeekplanMutation(formInput);
  if (!result.success) {
    const info = serialize(result);
    const errors = info.errors.map((error) => {
      return {
        name: error.name,
        message: error.message,
        path: error.path,
      };
    });
    return json({ success: false, errors }, { status: 400 });
  }

  return redirect(`/weekplans/${result.data}`);
};
