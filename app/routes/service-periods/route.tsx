import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { StaffShell } from "~/components/shell/staff-shell";
import { protectedRoute } from "~/lib/auth/auth.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);

  return json({ appUser });
};


export default function ServicePeriodsLayout() {
  let data = useLoaderData<typeof loader>();

  return (
    <StaffShell
      navigation={[
        { name: 'Home', href: '/', current: false },
        { name: 'Programs', href: '/programs', current: false },
        { name: 'Service Periods', href: '/service-periods', current: true },
      ]}
      appUser={data.appUser}
    >
      <Outlet />
    </StaffShell>
  )

}