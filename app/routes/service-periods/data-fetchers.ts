import { db } from "~/lib/database/firestore.server";

export const getServicePeriods = async () => {
  const servicePeriods = await db.service_periods.getAll();

  return servicePeriods;
};
