import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { FormTextField } from "~/components/forms/textfield";
import { createFamily } from "./mutations";

import { inputFromForm, serialize } from "composable-functions";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  return json({});
};



export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);
  const type = formInput.type

  if (type === "add_family") {
    return await createFamily({ formInput });
  }

  return json({
    success: false,
    errors: [
      {
        name: "actiontype",
        path: ["type"],
        message: "No valid action type was provided"
      }]
  },
    { status: 400 }
  );
};


export default function FamiliesAdd() {
  const actionData = useActionData<typeof action>();

  const fnameError = actionData?.errors.find((error) => error.path.includes("fname"));

  const lnameError = actionData?.errors.find((error) => error.path.includes("lname"));

  const phoneError = actionData?.errors.find((error) => error.path.includes("phone"));

  const streetError = actionData?.errors.find((error) => error.path.includes("street"));
  const unitError = actionData?.errors.find((error) => error.path.includes("unit"));
  const cityError = actionData?.errors.find((error) => error.path.includes("city"));
  const stateError = actionData?.errors.find((error) => error.path.includes("state"));
  const zipError = actionData?.errors.find((error) => error.path.includes("zip"));

  return (

    <>
      <Card className="my-4">
        <Form method="POST">
          <CardHeader>
            <CardTitle>Create Family</CardTitle>
            <CardDescription>
              Enter the information on the primary caregiver for this family.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 py-4">
            <FormTextField
              label="First Name" id="fname" error={fnameError?.message}
            />
            <FormTextField
              label="Last Name" id="lname" error={lnameError?.message}
            />
            <FormTextField
              label="Phone" id="phone" defaultValue=""
              error={phoneError?.message}
            />
            <FormTextField
              label="Street" id="street"
              error={streetError?.message}
            />
            <FormTextField
              label="Unit" id="unit"
              error={unitError?.message}
            />
            <FormTextField
              label="City" id="city" defaultValue="Thomasville"
              error={cityError?.message}
            />
            <FormTextField
              label="State" id="state" defaultValue="NC"
              error={stateError?.message}
            />
            <FormTextField
              label="Zip" id="zip" defaultValue="27360"
              error={zipError?.message}
            />
          </CardContent>
          <CardFooter className="pt-2 flex flex-row justify-between">
            <Button variant={"secondary"} type="button">
              Cancel
            </Button>
            <Button type="submit" name="type" value="add_family">
              Create
            </Button>
          </CardFooter>
        </Form>
      </Card>

    </>
  )


}

