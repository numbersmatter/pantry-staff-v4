import {
  Outlet,
  json,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError
} from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPageData } from "./data-fetchers";
import { Header } from "./components";
import { UIShell } from "~/components/shell/ui-shell";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);
  let periodId = params.periodId ?? "periodId";

  const { headerInfo } = await getPageData(periodId);
  const secondaryNav = {
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



  return json({ appUser, secondaryNav, headerInfo });
};



export default function ServicePeriod() {
  let data = useLoaderData<typeof loader>();


  return (
    <
      >
      <Header />
      <Outlet />
    </>
  )
}



export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>
      <h2>testing</h2>
    </div>
  }
  return <div>
    <h1>There was an error</h1>
    <p>No Period by that name found</p>
  </div>
}
