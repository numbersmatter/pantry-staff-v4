/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { ComposableWithSchema, inputFromForm } from "composable-functions";
import { unknown, type z } from "zod";
import { coerceValue } from "./coersions";

type FormSchema<T extends z.ZodTypeAny = z.SomeZodObject | z.ZodEffects<any>> =
  | z.ZodEffects<T>
  | z.SomeZodObject;
type FormActionFailure<SchemaType> = {
  errors: FormErrors<SchemaType>;
  values: FormValues<SchemaType>;
};

type FormValues<SchemaType> = Partial<Record<keyof SchemaType, any>>;

type FormErrors<SchemaType> = Partial<
  Record<keyof SchemaType | "_global", string[]>
>;

type PerformMutation<SchemaType, D extends unknown> =
  | ({ success: false } & FormActionFailure<SchemaType>)
  | { success: true; data: D };

type NewDomainFunction = ComposableWithSchema<Promise<unknown>>;

type PerformMutationProps<Schema extends FormSchema, D extends unknown> = {
  request: Request;
  schema: Schema;
  mutation: NewDomainFunction;
  environment?: unknown;
  transformValues?: (
    values: FormValues<z.infer<Schema>>
  ) => Record<string, unknown>;
};

type ObjectFromSchema<T> = T extends z.SomeZodObject
  ? T
  : T extends z.ZodEffects<infer R>
  ? ObjectFromSchema<R>
  : never;

function objectFromSchema<Schema extends FormSchema>(
  schema: Schema
): ObjectFromSchema<Schema> {
  return "shape" in schema ? schema : objectFromSchema(schema._def.schema);
}

async function getFormValues<Schema extends FormSchema>(
  request: Request,
  schema: Schema
): Promise<FormValues<z.infer<Schema>>> {
  const shape = objectFromSchema(schema).shape;

  const input = await inputFromForm(request);

  let values: FormValues<z.infer<Schema>> = {};
  for (const key in shape) {
    const value = input[key];
    values[key as keyof z.infer<Schema>] = coerceValue(value, shape[key]);
  }

  return values;
}

export async function newPerformMutation<
  Schema extends FormSchema,
  D extends unknown
>({
  request,
  schema,
  mutation,
  environment,
  transformValues = (values) => values,
}: PerformMutationProps<Schema, D>): Promise<PerformMutation<Schema, D>> {
  const values = await getFormValues(request, schema);
  const result = await mutation(transformValues(values), environment);

  const errors = result.errors;

  if (result.success) {
    const data = result.data;
    return { success: true, data: result.data };
  } else {
    return {
      success: false,
      errors,
      values,
    };
  }

  // if (result.success) {
  //   return { success: true, data: result.data };
  // } else {
  //   return {
  //     success: false,
  //     errors: {
  //       ...errorMessagesForSchema(result.inputErrors, schema),
  //       _global:
  //         result.errors.length || result.environmentErrors.length
  //           ? [...result.errors, ...result.environmentErrors].map(
  //               (error) => error.message
  //             )
  //           : undefined,
  //     } as FormErrors<Schema>,
  //     values,
  //   };
  // }
}
