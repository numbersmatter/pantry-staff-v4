import { json } from "@remix-run/node";
import {
  Failure,
  QueryStringRecord,
  serialize,
  withSchema,
} from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";

interface AddFamilyToSeatData {
  familyId: string;
  deliveryNotes: string;
  periodId: string;
}

const AddFamilyToSeatSchema = z.object({
  familyId: z.string().length(20, "Family ID must be 20 characters"),
  deliveryNotes: z.string(),
});

// This is what I want to do
const addFamilyToSeat = async (data: AddFamilyToSeatData) => {
  const family = await db.families.read(data.familyId);

  if (!family) {
    throw new Error("Family not found");
  }

  const applicationId = await db.applications.create({
    family_id: data.familyId,
    service_period_id: data.periodId,
    family: {
      family_name: family.family_name,
      address: family.address,
      members: family.members,
      students: family.students,
    },
  });

  const newSeatId = await db.seats.create({
    service_period_id: data.periodId,
    family_id: family.id,
    application_id: applicationId,
    status: "active",
    delivery_notes: data.deliveryNotes,
    is_active: true,
    address: family.address,
    family_name: family.family_name,
  });

  return newSeatId;
};

// These are the circumstances under which I want to run the mutation
const assignFamilySeatMutation = (periodId: string) =>
  withSchema(AddFamilyToSeatSchema)(async (values) => {
    const data = { ...values, periodId };
    return await addFamilyToSeat(data);
  });

// These are the input errors I want to handle
const composeFamilySeatErrorObject = (failure: Failure) => {
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
    familyId: inputErrors.find((e) => e.field === "familyId")?.message ?? "",
    periodId: inputErrors.find((e) => e.field === "periodId")?.message ?? "",
    deliveryNotes:
      inputErrors.find((e) => e.field === "deliveryNotes")?.message ?? "",
  };

  return errorObject;
};

// This is how I want to handle the response
const assignFamilyToSeat = async (
  periodId: string,
  formInput: QueryStringRecord
) => {
  const result = await assignFamilySeatMutation(periodId)(formInput);

  if (!result.success) {
    const errorObject = composeFamilySeatErrorObject(result);
    const serializedErrors = serialize(result);
    return json(
      {
        success: false,
        errorObject,
        type: "assignFamilyToSeat",
        serializedErrors,
      },
      { status: 400 }
    );
  }
  const errorObject: QueryStringRecord = {};
  return json({ success: true, errorObject, type: "assignFamilyToSeat" });
};

export { assignFamilyToSeat };
