export const validDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export type ValidDay = (typeof validDays)[number];

export interface TaskDay {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
}

interface TaskStatus {
  [k: string]: boolean;
}

export interface DayTask {
  title: string;
  description: string;
  id: string;
}
export interface WeekTaskData {
  monday: DayTask[];
  tuesday: DayTask[];
  wednesday: DayTask[];
  thursday: DayTask[];
  friday: DayTask[];
}

export interface WeekPlanBase {
  title: string;
  description: string;
  tasks: { [key: string]: DayTask };
  taskDay: TaskDay;
  taskEntry: { [key: string]: string };
  dataEntry: { [key: string]: string | number };
  // taskData: WeekTaskData;
}

export interface WeekPlanDBModel extends WeekPlanBase {}

export interface WeekPlan extends WeekPlanBase {
  id: string;
}
