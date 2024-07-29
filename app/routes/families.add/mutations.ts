import { json, redirect } from "@remix-run/node";
import { QueryStringRecord, serialize, withSchema } from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";
import { PersonType } from "~/lib/database/person/types";

const NewFamilySchema = z.object({
  fname: z.string().min(2, "Field must contain at least 2 characters").max(50),
  lname: z.string().min(2, "Field must contain at least 2 characters.").max(50),
  phone: z.string().length(10),
  street: z.string().min(2).max(50),
  unit: z.string().max(50),
  city: z.string().min(2).max(50),
  state: z.string().length(2),
  zip: z.string().length(5),
});

const newFamilyMutation = withSchema(NewFamilySchema)(async (values) => {
  const data = {
    first_name: values.fname,
    last_name: values.lname,
    phone: values.phone,
    street: values.street,
    unit: values.unit,
    city: values.city,
    state: values.state,
    zip: values.zip,
    email: "",
    type: "caregiver" as PersonType,
  };

  const personId = await db.person.create(data);

  const family_id = await db.families.create({
    primary_user_id: "",
    members: [personId],
    family_name: `${values.fname} ${values.lname} Family`,
    address: {
      street: values.street,
      unit: values.unit,
      city: values.city,
      state: values.state,
      zip: values.zip,
    },
    students: {
      tps: 0,
      lds: 0,
      tms: 0,
      ths: 0,
    },
  });

  return { personId, family_id };
});

export const createFamily = async ({
  formInput,
}: {
  formInput: QueryStringRecord;
}) => {
  const result = await newFamilyMutation(formInput);

  if (!result.success) {
    const info = serialize(result);
    const errors = info.errors.map((error) => {
      return {
        path: error.path,
        message: error.message,
        name: error.name,
      };
    });
    return json(
      {
        success: false,
        errors,
      },
      { status: 400 }
    );
  }

  return redirect(`/families/${result.data.family_id}`);
};
