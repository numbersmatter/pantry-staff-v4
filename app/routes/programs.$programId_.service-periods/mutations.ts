import { json, redirect } from "@remix-run/node";
import {
  QueryStringRecord,
  serialize,
  success,
  withSchema,
} from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";

const NewServicePeriodSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().nonempty().min(3).max(1000),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  capacity: z.coerce.number().int().positive(),
  program_id: z.string().length(20),
});

const createServicePeriodMutation = withSchema(NewServicePeriodSchema)(
  async (values) => {
    const data = {
      start_date: values.start_date,
      end_date: values.end_date,
      name: values.name,
      description: values.description,
      capacity: values.capacity,
      id: "",
      created_date: new Date(),
      updated_date: new Date(),
      program_id: values.program_id,
    };

    const servicePeriodID = await db.service_periods.create(data);
    return { ...data, id: servicePeriodID };
  }
);

const createServicePeriod = async ({
  formInput,
}: {
  formInput: QueryStringRecord;
}) => {
  const result = await createServicePeriodMutation(formInput);

  if (!result.success) {
    const info = serialize(result);
    return json({
      success: false,
      errors: info.errors,
    });
  }

  return redirect(`/service-periods/${result.data.id}`);
};

export { createServicePeriod };
