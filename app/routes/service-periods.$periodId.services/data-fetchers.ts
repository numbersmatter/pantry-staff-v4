import { db } from "~/lib/database/firestore.server";

const getPeriodServices = async (periodId: string) => {
  const servicesDocs = await db.service_transactions.queryByField(
    "service_period_id",
    "==",
    periodId
  );

  const services = servicesDocs.map((doc) => {
    return {
      id: doc.id,
      value: doc.value,
      memo: doc.memo ?? "",
      delivered_to: doc.delivered_to,
    };
  });

  return services;
};

export { getPeriodServices };
