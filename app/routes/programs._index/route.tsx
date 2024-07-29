import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { ProgramsList } from "./components/programs-table";
import { getProgramsData } from "./data-fetchers";
import { ProgramsHeader } from "./components/programs-header";
import { inputFromForm } from "composable-functions";
import { addProgram } from "./mutations";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const programsData = await getProgramsData();
  return json(programsData);
};


export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);

  const type = formInput.type

  if (type === "add_program") {
    return await addProgram({ formInput });
  }




  return json({
    success: false,
    errors: [
      {
        name: "actiontype",
        path: ["type"],
        message: "No valid action type was provided"
      }
    ]
  },
    { status: 400 }
  );
};


export default function ProgramsIndexLayout() {
  let { programsList, programs } = useLoaderData<typeof loader>();

  return (
    <>
      <ProgramsHeader />
      <ProgramsList programsList={programsList} />
      <pre>{JSON.stringify(programs, null, 2)}</pre>
    </>
  )
}
