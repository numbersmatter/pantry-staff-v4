import { db } from "~/lib/database/firestore.server";
import WeekplansIndex from "./route";

const getWeekplans = async () => {
  const weekplanDocs = await db.weekplan.getAll();
  const weekplans = weekplanDocs.map((doc) => {
    return {
      id: doc.id,
      title: doc.title,
      description: doc.description,
    };
  });
  console.log(weekplans);
  return weekplans;
};

export { getWeekplans };
