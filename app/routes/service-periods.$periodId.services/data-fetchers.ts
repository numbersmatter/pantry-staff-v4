import { db } from "~/lib/database/firestore.server";

const getPeriodServices = async (periodId: string) => {
  const services = await db.service_transactions.queryByField(
    "service_period_id",
    "==",
    periodId
  );

  return services;
};

export { getPeriodServices };
