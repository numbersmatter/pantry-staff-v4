import { redirect } from "@remix-run/node";
import { FamilyAppModel } from "~/lib/database/families/types";
import { db } from "~/lib/database/firestore.server";

const getServiceListSeatsData = async (listId: string | undefined) => {
  const service_list_id = listId ?? "listId";
  const list = await db.service_lists.read(service_list_id);
  if (!list) {
    throw new Error(`Service List with ID ${service_list_id} not found`);
  }

  if (list.status !== "preparing") {
    throw redirect(`/service-lists/${service_list_id}`);
  }

  const seatsOnOrderList = list.seats_array;

  const seatsInServicePeriod = await db.seats.queryByString(
    "service_period_id",
    list.service_period_id
  );

  const familyPromises = seatsInServicePeriod.map((seat) => {
    const id = seat.family_id;
    return db.families.read(id);
  });

  const familyCalls = await Promise.allSettled(familyPromises);

  const families = familyCalls
    .filter(
      (call): call is PromiseFulfilledResult<FamilyAppModel> =>
        call.status === "fulfilled"
    )
    .filter((call) => call.value !== null)
    .map((call) => call.value);

  const careGiverIDs = families.map((family) => family.members[0]);

  const personsCall = await db.person.getList(careGiverIDs);

  const seatsWithFamilies = seatsInServicePeriod
    .filter((seat) => families.find((family) => family.id === seat.family_id))
    .map((seat) => {
      const family = families.find(
        (family) => family.id === seat.family_id
      ) as FamilyAppModel;

      const primaryCareGiverID = family.members[0] ?? "error";

      const careGiver = personsCall.find(
        (person) => person.id === primaryCareGiverID
      ) ?? {
        last_name: "error",
      };

      const onList = seatsOnOrderList.includes(seat.id);

      return {
        id: seat.id,
        family_name: family.family_name,
        last_name: careGiver.last_name,
        onList,
      };
    });

  return seatsWithFamilies;
};

export { getServiceListSeatsData };
