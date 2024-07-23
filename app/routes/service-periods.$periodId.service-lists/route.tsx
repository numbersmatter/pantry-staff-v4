import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getServiceLists } from "./data-fetchers";
import { ServiceListTable } from "./components/data-table";
import { inputFromForm } from "composable-functions";
import { createList } from "./mutations";
import { CreateListDialog } from "./components/create-list-form";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const periodId = params.periodId ?? "periodId";

  const serviceLists = await getServiceLists(periodId)

  return json({ serviceLists, periodId: periodId });
};



export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);

  const formAction = formInput["type"] as string;

  if (formAction === "createList") {
    return await createList(formInput);
  }

  return null;
};


export default function ServicePeriodsPeriodIdServiceLists() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <div>
        <CreateListDialog periodId={data.periodId} />
      </div>
      <ServiceListTable />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

