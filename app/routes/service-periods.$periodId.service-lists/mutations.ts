import { json, redirect } from "@remix-run/node";
import {
  Failure,
  QueryStringRecord,
  serialize,
  withSchema,
} from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";
import { servicePeriodToDbModel } from "~/lib/database/service-periods/service-periods-crud.server";
import { ServicePeriodDbModel } from "~/lib/database/service-periods/types/service-periods-model";
import { ServiceTransaction } from "~/lib/database/service-transactions/types/service-trans-model";

interface CreateListData {
  name: string;
  description: string;
  service_period_id: string;
  service_period: ServicePeriodDbModel;
}

// This is what I want to do
const createServiceList = async (listData: CreateListData) => {
  const newListData = {
    name: listData.name,
    description: listData.description,
    service_period_id: listData.service_period_id,
    service_period: listData.service_period,
    seats_array: [],
    service_items: [],
    service_type: "FoodBoxOrder",
    status: "preparing",
  };

  const listId = await db.service_lists.create(newListData);

  return listId;
};

// These are the circumstances under which I want to run the mutation
const CreateListSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  service_period_id: z
    .string()
    .length(20, "Service period ID must be 20 characters"),
});

const createListMutation = withSchema(CreateListSchema)(async (values) => {
  const period = await db.service_periods.read(values.service_period_id);
  if (!period) {
    throw new Error("Service period not found");
  }

  const servicePeriod = servicePeriodToDbModel(period);

  const listData = {
    ...values,
    service_period: servicePeriod,
  };
  const listId = await createServiceList(listData);
  return listId;
});

// These are the input errors I want to catch
// These are the input errors I want to handle
const composeInputErrors = (failure: Failure) => {
  const serializedErrors = serialize(failure);
  const inputErrors = serializedErrors.errors
    .filter((e) => e.name === "InputError")
    .map((e) => {
      return {
        field: e.path[0],
        message: e.message,
      };
    });

  return inputErrors;
};

// This is how to deal with the response from the mutation
const createList = async (formInput: QueryStringRecord) => {
  const result = await createListMutation(formInput);
  if (!result.success) {
    const inputErrors = composeInputErrors(result);
    return json({
      inputErrors,
      success: false,
    });
  }
  const listId = result.data;
  return redirect(`/service-lists/${listId}`);
};

export { createList };
