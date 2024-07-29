import { json, redirect } from "@remix-run/node";
import { withSchema, QueryStringRecord, serialize } from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";

// Add Program Mutations

const AddProgramSchema = z.object({
  name: z
    .string()
    .min(3, "Program Name must be at least 3 characters long")
    .max(50, "Program Name must be at most 50 characters long"),
  program_area_id: z.string().length(20),
  criteria: z.string().max(200, "Criteria must be at most 200 characters long"),
});

const addProgramMutation = withSchema(AddProgramSchema)(async (values) => {
  const programData = {
    name: values.name,
    program_area_id: values.program_area_id,
    criteria: values.criteria ?? "",
    id: "id",
  };

  const newProgramId = await db.programs.create(programData);

  return newProgramId;
});

export const addProgram = async ({
  formInput,
}: {
  formInput: QueryStringRecord;
}) => {
  const result = await addProgramMutation(formInput);

  if (!result.success) {
    const errors = serialize(result).errors.map((error) => {
      return {
        name: error.name,
        message: error.message,
        path: error.path,
      };
    });

    return json(
      {
        success: false,
        errors: errors,
      },
      { status: 400 }
    );
  }

  return redirect(`/programs/${result.data}`);
};
