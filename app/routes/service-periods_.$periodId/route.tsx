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
        name: "Families",
        to: `/service-periods/${periodId}/families`,
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
    <UIShell
      secondaryNav={data.secondaryNav}
      appUser={data.appUser}
    >
      <Header />
      <Outlet />
    </UIShell>
  )
}



export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div />
  }
  return <div />
}
