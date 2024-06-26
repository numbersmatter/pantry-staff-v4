import {
  Result,
  SerializableResult,
  serialize,
  withSchema,
} from "composable-functions";
import { z } from "zod";
import { TypedResponse, json } from "@remix-run/node";
import { db } from "~/lib/database/firestore.server";

const newFamilySchema = z.object({
  fname: z.string().min(2, "Field must contain at least 2 characters").max(50),
  lname: z.string().min(2, "Field must contain at least 2 characters.").max(50),
  phone: z.string().length(10),
  street: z.string().min(2).max(50),
  unit: z.string().max(50),
  city: z.string().min(2).max(50),
  state: z.string().length(2),
  zip: z.string().length(5),
});

const addNewFamily = withSchema(newFamilySchema)(async (input, ctx) => {
  const personId = await db.person.create({
    first_name: input.fname,
    last_name: input.lname,
    phone: input.phone,
    email: "",
    type: "caregiver",
  });
  const familyId = await db.families.create({
    primary_user_id: "",
    members: [personId],
    family_name: `${input.fname} ${input.lname} Family`,
    address: {
      street: input.street,
      unit: input.unit,
      city: input.city,
      state: input.state,
      zip: input.zip,
    },
    students: {
      tps: 0,
      lds: 0,
      tms: 0,
      ths: 0,
    },
  });

  return { personId, familyId };
});

const actionResponse = <X>(
  result: Result<X>,
  opts?: RequestInit
): TypedResponse<SerializableResult<X>> =>
  json(serialize(result), { status: result.success ? 200 : 422, ...opts });

export { addNewFamily, newFamilySchema, actionResponse };
