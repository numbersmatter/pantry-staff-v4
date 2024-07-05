import { FamilyAppModel } from "~/lib/database/families/types";
import { db } from "~/lib/database/firestore.server";

export const getSeatData = async (periodId: string) => {
  // get seats in period
  const seats_in_period = await db.seats.queryByString(
    "service_period_id",
    periodId
  );

  const seatsOrdered = seats_in_period.sort((a, b) => {
    return b.enrolled_date.getTime() - a.enrolled_date.getTime();
  });

  // create an array of read promises for the families
  const familyPromises = seats_in_period.map((seat) => {
    return db.families.read(seat.family_id);
  });

  // resolve the promises
  const familiesUnfiltered = await Promise.all(familyPromises);
  const families = familiesUnfiltered.filter(
    (family) => family !== undefined
  ) as FamilyAppModel[];

  // add the family data to the seat object
  const seatsWithFamilies = seatsOrdered.map((seat, index) => {
    const family = families.find((family) => family.id === seat.family_id);
    if (!family) return;
    return {
      ...seat,
      family_name: family.family_name,
      family_id: family.id,
      number_of_members: family.members.length,
    };
  });

  return seatsWithFamilies;
};
