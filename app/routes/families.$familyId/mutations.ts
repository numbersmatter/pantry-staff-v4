import { json } from "@remix-run/node";
import {
  Failure,
  QueryStringRecord,
  serialize,
  withSchema,
} from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";

// Update Family Name Mutation
const familyNameSchema = z.object({
  fieldId: z.literal("family_name"),
  value: z.string().min(3).max(50),
});

export interface ErrorObject {
  [key: string]: string;
}

const updateFamilyNameMutation = (familyId: string) =>
  withSchema(familyNameSchema)(async (values) => {
    const fieldId = values.fieldId;
    const value = values.value;
    if (fieldId === "family_name") {
      await db.families.update(familyId, { family_name: value });
    }

    return { values };
  });

const composeFamilyNameErrorObject = (failure: Failure) => {
  const serializedErrors = serialize(failure);
  const inputErrors = serializedErrors.errors
    .filter((e) => e.name === "InputError")
    .map((e) => {
      return {
        field: e.path[0],
        message: e.message,
      };
    });

  const errorObject = {
    fieldId: inputErrors.find((e) => e.field === "fieldId")?.message ?? "",
    value: inputErrors.find((e) => e.field === "value")?.message ?? "",
  };

  return errorObject;
};

const updateFamilyName = async (
  familyId: string,
  formInput: QueryStringRecord
) => {
  const result = await updateFamilyNameMutation(familyId)(formInput);
  if (!result.success) {
    const errorObject = composeFamilyNameErrorObject(result);
    return json(
      { success: false, errorObject, type: "updateFamilyName" },
      { status: 400 }
    );
  }
  const errorObject: ErrorObject = {};
  return json({ success: true, errorObject, type: "updateFamilyName" });
};

// Update Address Mutation
const familyAddressSchema = z.object({
  street: z.string().min(3).max(50),
  unit: z.string(),
  city: z.string().min(3).max(50),
  state: z.string().length(2),
  zip: z.string().length(5),
});

const updateAddressMutation = (familyId: string) =>
  withSchema(familyAddressSchema)(async (values) => {
    const address = values;
    await db.families.update(familyId, { address });
    return { values };
  });

const composeFamilyAddressErrorObject = (failure: Failure) => {
  const serializedErrors = serialize(failure);
  const inputErrors = serializedErrors.errors
    .filter((e) => e.name === "InputError")
    .map((e) => {
      return {
        field: e.path[0],
        message: e.message,
      };
    });

  const errorObject = {
    street: inputErrors.find((e) => e.field === "street")?.message ?? "",
    unit: inputErrors.find((e) => e.field === "unit")?.message ?? "",
    city: inputErrors.find((e) => e.field === "city")?.message ?? "",
    state: inputErrors.find((e) => e.field === "state")?.message ?? "",
    zip: inputErrors.find((e) => e.field === "zip")?.message ?? "",
  };

  return errorObject;
};

const updateAddress = async (
  familyId: string,
  formInput: QueryStringRecord
) => {
  const result = await updateAddressMutation(familyId)(formInput);
  if (!result.success) {
    const errorObject = composeFamilyAddressErrorObject(result);
    return json(
      { success: false, errorObject, type: "updateAddress" },
      { status: 400 }
    );
  }
  const errorObject: ErrorObject = {};
  return json({ success: true, errorObject, type: "updateAddress" });
};

// Update Students Mutation
const studentSchema = z.object({
  tps: z.coerce.number().nonnegative().int(),
  lds: z.coerce.number().nonnegative().int(),
  tms: z.coerce.number().nonnegative().int(),
  ths: z.coerce.number().nonnegative().int(),
});

const composeUpdateStudentsErrorObject = (failure: Failure) => {
  const serializedErrors = serialize(failure);
  const inputErrors = serializedErrors.errors
    .filter((e) => e.name === "InputError")
    .map((e) => {
      return {
        field: e.path[0],
        message: e.message,
      };
    });

  const errorObject = {
    tps: inputErrors.find((e) => e.field === "tps")?.message ?? "",
    lds: inputErrors.find((e) => e.field === "lds")?.message ?? "",
    tms: inputErrors.find((e) => e.field === "tms")?.message ?? "",
    ths: inputErrors.find((e) => e.field === "ths")?.message ?? "",
  };

  return errorObject;
};

const updateStudentsMutation = (familyId: string) =>
  withSchema(studentSchema)(async (values) => {
    const students = values;
    await db.families.update(familyId, { students });
    return { values };
  });

const updateStudents = async (
  familyId: string,
  formInput: QueryStringRecord
) => {
  const result = await updateStudentsMutation(familyId)(formInput);
  if (!result.success) {
    const errorObject = composeUpdateStudentsErrorObject(result);
    return json(
      { success: false, errorObject, type: "updateStudents" },
      { status: 400 }
    );
  }
  const errorObject: ErrorObject = {};
  return json({ success: true, errorObject, type: "updateStudents" });
};

export { updateFamilyName, updateAddress, updateStudents };
