import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getServicePeriods } from "./data-fetchers";
import { UIShell } from "~/components/shell/ui-shell";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);

  const servicePeriods = await getServicePeriods();

  return json({ appUser, servicePeriods });
};


export default function ServicePeriodsLayout() {
  let data = useLoaderData<typeof loader>();

  return (
    <UIShell
      appUser={data.appUser}
    >
      <Outlet />
    </UIShell>
  )

}