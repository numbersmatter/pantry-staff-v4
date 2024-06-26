import {
  Result,
  SerializableResult,
  composable,
  serialize,
  withSchema,
} from "composable-functions";

import { z } from "zod";
import { newPerformMutation } from "./modified-perform-mutation";
import { TypedResponse, json } from "@remix-run/node";

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
  const personId = "1";
  const familyId = "2";

  return { personId, familyId };
});

const addFamily = (request: Request) =>
  newPerformMutation({
    request,
    schema: newFamilySchema,
    mutation: addNewFamily,
  });

const actionResponse = <X>(
  result: Result<X>,
  opts?: RequestInit
): TypedResponse<SerializableResult<X>> =>
  json(serialize(result), { status: result.success ? 200 : 422, ...opts });

export { addNewFamily, newFamilySchema, addFamily, actionResponse };
