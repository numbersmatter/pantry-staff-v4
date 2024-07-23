import {
  Outlet,
  json,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError
} from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { UIShell } from "~/components/shell/ui-shell";
import { checkServicePeriod } from "./data-fetchers";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);
  let periodId = params.periodId ?? "periodId";

  const servicePeriodExist = await checkServicePeriod(periodId);

  const periodExistsNav = {
    name: "Modify Service Period",
    links: [
      {
        name: "Overview",
        to: `/service-periods/${periodId}`,
        end: true
      },
      {
        name: "Seats",
        to: `/service-periods/${periodId}/seats`,
        end: false
      },
      {
        name: "Services",
        to: `/service-periods/${periodId}/services`,
        end: false
      },
      {
        name: "Service Lists",
        to: `/service-periods/${periodId}/service-lists`,
        end: false
      },
    ]
  }

  const periodDoesNotExistNav = {
    name: "Error",
    links: [
      {
        name: "Go to Service Periods",
        to: `/service-periods`,
        end: true
      }
    ]
  }

  const secondaryNav = servicePeriodExist ? periodExistsNav : periodDoesNotExistNav



  return json({ appUser, secondaryNav });
};



export default function ServicePeriodsLayouts() {

  let data = useLoaderData<typeof loader>();


  return (
    <UIShell
      secondaryNav={data.secondaryNav}
      appUser={data.appUser}
    >
      <Outlet />
    </UIShell>
  )
}



export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>
      <h1>There was an error</h1>
      <p>{error.status}</p>
    </div>
  }
  return <div />
}


