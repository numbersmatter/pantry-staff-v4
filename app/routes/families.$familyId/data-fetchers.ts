import { db } from "~/lib/database/firestore.server";

const checkFamilyExists = async (familyId: string) => {
  const familyDoc = await db.families.read(familyId);
  if (!familyDoc) {
    throw new Error("Family not found");
  }
  return familyDoc;
};

export { checkFamilyExists };
