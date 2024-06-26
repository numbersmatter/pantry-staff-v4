import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { StaffShell } from "~/components/shell/staff-shell";
import { protectedRoute } from "~/lib/auth/auth.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request)
  return json({ appUser });
};



export default function FamiliesLayout() {

  const data = useLoaderData<typeof loader>();

  return (
    <StaffShell
      navigation={[
        { name: 'Home', href: '/home', current: true },
        { name: 'Families', href: '/families', current: true },
        { name: 'Add Family', href: '/families/add', current: true },
        // { name: 'Reporting', href: '/reporting/', current: false },
        // { name: 'Weekplans', href: '/weekplans/', current: false },
      ]}
      appUser={data.appUser}
    >
      <h1>hello</h1>
      <pre>{JSON.stringify(data)}</pre>
      <Outlet />
    </StaffShell>
  );

}