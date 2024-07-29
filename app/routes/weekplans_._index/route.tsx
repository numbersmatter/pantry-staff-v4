import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { UIShell } from "~/components/shell/ui-shell";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getWeekplans } from "./data-fetchers"
import { Header } from "./components/header";
import { WeekplanTable } from "./components/weekplan-table";
import { inputFromForm } from "composable-functions";
import { createWeekplan } from "./mutations";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { appUser } = await protectedRoute(request);
  const weekplans = await getWeekplans();
  return json({ appUser, weekplans });
};


export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);
  const type = formInput.type;

  if (type === "create_weekplan") {
    return await createWeekplan({ formInput });
  }

  return json(
    {
      success: false,
      errors: [{ name: "error", message: "No Valid Type", path: ["type"] }]
    },
    {
      status: 400
    }
  );
};



export default function WeekplansIndex() {
  const data = useLoaderData<typeof loader>();
  return (
    <UIShell
      appUser={data.appUser}
    >
      <Header />
      <WeekplanTable />
      <div className="prose">

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </UIShell>
  )


}

