import { db } from "~/lib/database/firestore.server";

let getCurrentPeriod = async (programId: string) => {
  const servicePeriod = await db.service_periods.getLastServicePeriod(
    programId
  );
  return servicePeriod;
};

export { getCurrentPeriod };
