import { db } from "~/lib/database/firestore.server";

const getTaskOnDay = async ({
  weekplanId,
  day,
}: {
  weekplanId: string;
  day: string;
}) => {
  const weekplan = await db.weekplan.read(weekplanId);

  if (!weekplan) {
    throw new Error("Weekplan not found");
  }

  const validDays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  if (!validDays.includes(day)) {
    throw new Error("Invalid day");
  }

  const selectedDay = day as keyof typeof weekplan.taskDay;
  const tasksOnDay = weekplan.taskDay[selectedDay];
  const tasks = weekplan.tasks;

  const taskSteps = tasksOnDay.map((taskId) => {
    const task = tasks[taskId] ?? {
      title: "Error Title",
      description: "error description",
    };

    return {
      name: task.title,
      description: task.description,
      to: `/weekplans/${weekplan.id}/task/${task.id}`,
      status: weekplan.taskEntry[taskId] ? "complete" : "upcoming",
      id: task.id,
    };
  });
};
