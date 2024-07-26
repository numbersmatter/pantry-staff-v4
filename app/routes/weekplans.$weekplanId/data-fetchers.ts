import { db } from "~/lib/database/firestore.server";
import { WeekPlan } from "~/lib/database/weekplan/types";
interface TaskStatus {
  incomplete: string[];
  all: string[];
}

const calculateWeekplanStatus = (weekplan: WeekPlan) => {
  const taskEntry = weekplan.taskEntry;

  const mondayIncompleteTasks = weekplan.taskDay.monday.filter(
    (taskId) => !taskEntry[taskId]
  );
  const tuesdayIncompleteTasks = weekplan.taskDay.tuesday.filter(
    (taskId) => !taskEntry[taskId]
  );

  const wednesdayIncompleteTasks = weekplan.taskDay.wednesday.filter(
    (taskId) => !taskEntry[taskId]
  );
  const thursdayIncompleteTasks = weekplan.taskDay.thursday.filter(
    (taskId) => !taskEntry[taskId]
  );
  const fridayIncompleteTasks = weekplan.taskDay.friday.filter(
    (taskId) => !taskEntry[taskId]
  );

  return {
    monday: {
      incomplete: mondayIncompleteTasks,
      all: weekplan.taskDay.monday,
    } as TaskStatus,
    tuesday: {
      incomplete: tuesdayIncompleteTasks,
      all: weekplan.taskDay.tuesday,
    } as TaskStatus,
    wednesday: {
      incomplete: wednesdayIncompleteTasks,
      all: weekplan.taskDay.wednesday,
    } as TaskStatus,
    thursday: {
      incomplete: thursdayIncompleteTasks,
      all: weekplan.taskDay.thursday,
    } as TaskStatus,
    friday: {
      incomplete: fridayIncompleteTasks,
      all: weekplan.taskDay.friday,
    } as TaskStatus,
  };
};

const getWeekplanData = async (weekplanId: string) => {
  const weekplanDoc = await db.weekplan.read(weekplanId);

  if (!weekplanDoc) {
    throw new Error("Weekplan not found");
  }

  const taskStatus = calculateWeekplanStatus(weekplanDoc);

  return {
    ...weekplanDoc,
    taskStatus,
  };
};

export { getWeekplanData };
