import { db } from "~/lib/database/firestore.server";

export const getServicePeriods = async () => {
  const servicePeriods = await db.service_periods.getAll();

  const servicePeriodsData = servicePeriods.map((servicePeriod) => {
    return {
      id: servicePeriod.id,
      name: servicePeriod.name,
      description: servicePeriod.description,
    };
  });

  return servicePeriodsData;
};
