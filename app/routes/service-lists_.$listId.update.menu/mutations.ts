import { json } from "@remix-run/node";
import {
  Failure,
  QueryStringRecord,
  serialize,
  withSchema,
} from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";
import { ItemTypes } from "~/lib/database/service-lists/types";

interface ItemInputs {
  name: string;
  quantity: number;
  value: number;
}

// What I want to do
const addItemServiceListArray = async (
  listId: string,
  itemInputs: ItemInputs
) => {
  const serviceList = await db.service_lists.read(listId);
  if (!serviceList) {
    const message = `Service List with ID ${listId} not found`;
    throw new Error(message);
  }

  const item = {
    // item_id: "item_id",
    item_name: itemInputs.name,
    quantity: itemInputs.quantity,
    value: itemInputs.value,
    type: "individual-items" as ItemTypes,
  };

  return await db.service_lists.addItem(listId, item);
};

const AddItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  service_list_id: z
    .string()
    .length(20, "Service list ID must be 20 characters"),
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive("Quantity must be a positive number")
    .int("Quantity must be a whole number"),
  value: z.coerce
    .number({
      required_error: "Unit Value is required",
      invalid_type_error: "Unit Value must be a number",
    })
    .positive("Value must be a positive number")
    .int("Value must be a whole number"),
});

const UpdateItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  item_id: z.string().length(20, "Item ID must be 20 characters"),
  service_list_id: z
    .string()
    .length(20, "Service list ID must be 20 characters"),
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive("Quantity must be a positive number")
    .int("Quantity must be a whole number"),
  value: z.coerce
    .number({
      required_error: "Unit Value is required",
      invalid_type_error: "Unit Value must be a number",
    })
    .positive("Value must be a positive number")
    .int("Value must be a whole number"),
});

const addItemMutation = withSchema(AddItemSchema)(async (values) => {
  const listId = values.service_list_id;
  return await addItemServiceListArray(listId, values);
});

// compose Input Errors
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

const addServiceItem = async (formInput: QueryStringRecord) => {
  const result = await addItemMutation(formInput);

  console.log(result);
  if (!result.success) {
    const inputErrors = composeInputErrors(result);

    return json({
      success: false,
      inputErrors,
    });
  }
  return json({
    success: true,
    inputErrors: [],
  });
};

const updateItemMutation = withSchema(UpdateItemSchema)(async (values) => {
  const listId = values.service_list_id;
  const updateData = {
    listId,
    newItem: {
      item_id: values.item_id,
      item_name: values.name,
      quantity: values.quantity,
      value: values.value,
      type: "individual-items" as ItemTypes,
    },
  };
  return await db.service_lists.updateServiceItem(updateData);
});

const updateServiceItem = async (formInput: QueryStringRecord) => {
  const result = await updateItemMutation(formInput);

  if (!result.success) {
    const inputErrors = composeInputErrors(result);

    return json({
      success: false,
      inputErrors,
    });
  }
  return json({
    success: true,
    inputErrors: [],
  });
};

const deleteItemMutation = withSchema(UpdateItemSchema)(async (values) => {
  const listId = values.service_list_id;
  const updateData = {
    listId,
    newItem: {
      item_id: values.item_id,
      item_name: values.name,
      quantity: values.quantity,
      value: values.value,
      type: "individual-items" as ItemTypes,
    },
  };
  return await db.service_lists.removeItem(listId, updateData.newItem);
});

const deleteServiceItem = async (formInput: QueryStringRecord) => {
  const result = await deleteItemMutation(formInput);

  if (!result.success) {
    const inputErrors = composeInputErrors(result);
    return json({
      success: false,
      inputErrors,
    });
  }
  return json({
    success: true,
    inputErrors: [],
  });
};

export { addServiceItem, updateServiceItem, deleteServiceItem };
