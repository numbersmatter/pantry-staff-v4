import { db } from "~/lib/database/firestore.server";

const checkServicePeriod = async (servicePeriodId: string) => {
  const period = await db.service_periods.read(servicePeriodId);

  if (!period) {
    return false;
  }

  return true;
};

export { checkServicePeriod };
