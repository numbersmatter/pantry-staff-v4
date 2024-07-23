import { db } from "~/lib/database/firestore.server";


const checkPeriodExists = async (periodId: string) => {
  const period = await db.service_periods.read(periodId);
  if (!period) {
    throw new Error("Period does not exist");
  }

  return period;
}

const getServiceLists = async (paramId: string | undefined) => {
  const periodId = paramId ?? "periodId";
  await checkPeriodExists(periodId);

  const serviceListsData = await db.service_lists.inPeriod(periodId);

  const serviceLists = serviceListsData.map((serviceList) => {
    return {
      id: serviceList.id,
      name: serviceList.name,
      description: serviceList.description,
      service_period_id: serviceList.service_period_id,
      seats: serviceList.seats_array,
    };
  });


  return serviceLists;
}


export { getServiceLists };