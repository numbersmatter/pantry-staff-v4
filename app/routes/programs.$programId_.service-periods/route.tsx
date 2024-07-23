import { Form, json, useLoaderData } from "@remix-run/react"
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { StandardContainer } from "~/components/common/containers";
import { CardFooter } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { DatePicker } from "~/components/forms/date-picker";
import { FormTextArea } from "~/components/forms/text-area";
import { FormTextField } from "~/components/forms/textfield";
import { DayPicker } from "react-day-picker";
import calendarStyles from "react-day-picker/style.module.css";
import { DateInput } from "~/components/forms/date-input";
import AddPeriodForm from "./components/add-service-period-form";
import { protectedRoute } from "~/lib/auth/auth.server";
import { createServicePeriod } from "./mutations";
import { inputFromForm } from "composable-functions";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const programId = params.programId ?? "programId";



  return json({ programId });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);
  const action = formInput["_action"] as string;


  if (action === "createPeriod") {
    return await createServicePeriod({ formInput });
  }
  return json({
    success: false,
    errors: [
      {
        exception: {
          path: ["_action"],
          name: "ActionError",
        },
        message: "No valid action type provided.",
        name: "ActionError",
        path: ["_action"],
      },
    ],
  });
}



export default function ProgramServicePeriods() {

  const data = useLoaderData();
  return (
    <>
      <Header />
      <AddPeriodForm />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

function Header() {
  return (
    <StandardContainer>
      <div className="prose">
        <h1>Add Program Service Period</h1>
      </div>
    </StandardContainer>
  )
}

function AddPeriodForm2() {

  return (
    <Form method="POST">
      <FormTextField
        label="Name"
        id="name"
      />
      <FormTextArea
        label="Description"
        id="description"
      />
      <div className="grid grid-cols-1 gap-2 pb-1">
        <Label htmlFor="start_date">Start Date</Label>
        <DateInput inputId="start_date" />
      </div>
      <div className="grid grid-cols-1 gap-2 pb-1 md:grid-cols-4 md:items-center md:gap-4">
        <Label htmlFor="end_date">End Date</Label>
      </div>
      <CardFooter>
      </CardFooter>

    </Form>
  )
}