import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { StaffShell } from "~/components/shell/staff-shell";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPageData } from "./data-fetchers";
import { Header } from "./components";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);
  let periodId = params.periodId ?? "periodId";

  const { headerInfo } = await getPageData(periodId);
  const secondaryNav = {
    name: "Modify Service Period",
    links: [
      {
        name: "Overview",
        href: `/service-periods/${periodId}`,
        current: true
      },
      {
        name: "Seats",
        href: `/service-periods/${periodId}/seats`,
        current: false
      },
      {
        name: "Services",
        href: `/service-periods/${periodId}/services`,
        current: false
      },
      {
        name: "Families",
        href: `/service-periods/${periodId}/families`,
        current: false
      },
      {
        name: "Service Lists",
        href: `/service-periods/${periodId}/service-lists`,
        current: false
      },
    ]
  }



  return json({ appUser, secondaryNav, headerInfo });
};



export default function ServicePeriod() {
  let data = useLoaderData<typeof loader>();


  return (
    <StaffShell
      navigation={[
        { name: 'Home', href: '/', current: false },
        { name: 'Programs', href: '/programs', current: false },
        { name: 'Service Periods', href: '/service-periods', current: true },

      ]}
      secondaryNav={data.secondaryNav}
      appUser={data.appUser}
    >
      <Header />
      <Outlet />
    </StaffShell>
  )
}
