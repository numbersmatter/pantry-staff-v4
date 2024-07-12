import { withSchema } from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";
import { ItemTypes } from "~/lib/database/service-lists/types";

const AddItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  quantity: z
    .number()
    .nonnegative("Quantity must be a positive number")
    .int("Quantity must be a whole number"),
  value: z
    .number()
    .nonnegative("Value must be a positive number")
    .int("Value must be a whole number"),
});

const addItemMutation = withSchema(AddItemSchema)(async (values) => {
  const item = {
    item_id: "item_id",
    item_name: values.name,
    quantity: values.quantity,
    value: values.value,
    type: "individual-items" as ItemTypes,
  };
  return await db.service_lists.addItem(values.name, item);
});
