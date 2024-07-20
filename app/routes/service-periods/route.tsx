import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getServicePeriods } from "./data-fetchers";
import { UIShell } from "~/components/shell/ui-shell";
import { ServicePeriodTable } from "./components/service-period-table";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);

  const servicePeriodsData = await getServicePeriods();

  return json({ appUser, servicePeriodsData });
};


export default function ServicePeriodsLayout() {
  let data = useLoaderData<typeof loader>();

  return (
    <UIShell
      appUser={data.appUser}
    >
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Service Periods
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all service periods.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

          </div>
        </div>
      </div>
      <div className="py-3">

        <ServicePeriodTable />
      </div>

    </UIShell>
  )

}