import { db } from "~/lib/database/firestore.server";

const getWeekplanData = async (weekplanId: string) => {
  const weekplanDoc = await db.weekplan.read(weekplanId);

  if (!weekplanDoc) {
    throw new Error("Weekplan not found");
  }

  return weekplanDoc;
};

export { getWeekplanData };
