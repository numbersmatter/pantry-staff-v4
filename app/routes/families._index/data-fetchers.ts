import { db } from "~/lib/database/firestore.server";
import { PersonAppModel } from "~/lib/database/person/types";

const getPeople = async (peopleIds: string[]) => {};

const getFamilies = async () => {
  const families = await db.families.getAll();

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
      ...person,
    };
  });

  return familyDataWithCareGivers;
};

export { getFamilies };
