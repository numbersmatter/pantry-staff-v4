import { FamilyAppModel } from "~/lib/database/families/types";
import { db } from "~/lib/database/firestore.server";
import { PersonAppModel } from "~/lib/database/person/types";

export const getFamiliesWithSeatsData = async (periodId: string) => {
  const families = await db.families.getAll();
  const seats_in_period = await db.seats.queryByString(
    "service_period_id",
    periodId
  );

  const familyData = families.map((family) => {
    return {
      id: family.id,
      name: family.family_name,
      primaryCaregiverID: family.members[0],
    };
  });

  const careGiverIDs = familyData.map((family) => family.primaryCaregiverID);
  const personsCall = await db.person.getList(careGiverIDs);

  const persons = personsCall.map((person: PersonAppModel) => {
    const { id, last_name, first_name, email } = person;
    return {
      id,
      last_name,
      first_name,
      email,
    };
  });

  const familyDataWithCareGivers = familyData.map((family) => {
    const personId = family.primaryCaregiverID;
    const person = persons.find((person) => person.id === personId) ?? {
      id: "error",
      last_name: "error",
      first_name: "error",
      email: "error",
    };

    return {
      ...family,
      primaryCareGiver: {
        id: person.id,
        last_name: person.last_name,
        first_name: person.first_name,
        email: person.email,
      },
    };
  });

  const familiesWithSeats = familyDataWithCareGivers.map((family) => {
    const seat = seats_in_period.find((seat) => seat.family_id === family.id);

    if (!seat)
      return {
        ...family,
        enrolled_date: null,
        seat_id: "error",
      };

    return {
      ...family,
      enrolled_date: seat.enrolled_date,
      seat_id: seat.id,
    };
  });

  return familiesWithSeats;
};

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
