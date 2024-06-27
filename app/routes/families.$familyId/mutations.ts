import { withSchema } from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";

const fieldIds = [
  "family_name",
  "street",
  "unit",
  "zip",
  "city",
  "state",
] as const;

const familyNameSchema = z.object({
  fieldId: z.enum(fieldIds),
  value: z.string().min(3).max(50),
});
const familyAddressSchema = z.object({
  street: z.string().min(3).max(50),
  unit: z.string(),
  city: z.string().min(3).max(50),
  state: z.string().length(2),
  zip: z.string().length(5),
});

const studentSchema = z.object({
  tps: z.coerce.number().nonnegative().int(),
  lds: z.coerce.number().nonnegative().int(),
  tms: z.coerce.number().nonnegative().int(),
  ths: z.coerce.number().nonnegative().int(),
});

const familyNamemutation = (familyId: string) =>
  withSchema(familyNameSchema)(async (values) => {
    const fieldId = values.fieldId;
    const value = values.value;
    if (fieldId === "family_name") {
      await db.families.update(familyId, { family_name: value });
    }

    return { values };
  });

const updateAddressMutation = (familyId: string) =>
  withSchema(familyAddressSchema)(async (values) => {
    const address = values;
    await db.families.update(familyId, { address });
    return { values };
  });

const updateStudentsMutation = (familyId: string) =>
  withSchema(studentSchema)(async (values) => {
    const students = values;
    await db.families.update(familyId, { students });
    return { values };
  });
