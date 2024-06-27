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
import { addNewFamily, composeErrorObject } from "./data-fetchers";

import { inputFromForm, serialize } from "composable-functions";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  return json({});
};



export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);
  const result = await addNewFamily(formInput);

  if (!result.success) {
    const errorObject = composeErrorObject(result)
    return json({ errorObject }, { status: 400 })
  }

  return redirect(`/families/${result.data.familyId}`)
};


export default function FamiliesAdd() {
  const actionData = useActionData<typeof action>();
  const errorObject = actionData?.errorObject;

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
              label="First Name" id="fname" error={errorObject?.fname}
            />
            <FormTextField
              label="Last Name" id="lname" error={errorObject?.lname}
            />
            <FormTextField
              label="Phone" id="phone" defaultValue=""
              error={errorObject?.phone}
            />
            <FormTextField
              label="Street" id="street"
              error={errorObject?.street}
            />
            <FormTextField
              label="Unit" id="unit"
              error={errorObject?.unit}
            />
            <FormTextField
              label="City" id="city" defaultValue="Thomasville"
              error={errorObject?.city}
            />
            <FormTextField
              label="State" id="state" defaultValue="NC"
              error={errorObject?.state}
            />
            <FormTextField
              label="Zip" id="zip" defaultValue="27360"
              error={errorObject?.zip}
            />
          </CardContent>
          <CardFooter className="pt-2 flex flex-row justify-between">
            <Button variant={"secondary"} type="button">Cancel</Button>
            <Button type="submit">Save changes</Button>
          </CardFooter>
        </Form>
      </Card>

    </>
  )


}

