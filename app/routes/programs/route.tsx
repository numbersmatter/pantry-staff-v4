import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { StaffShell } from "~/components/shell/staff-shell";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);
  return json({ appUser });
};

export default function Layout() {
  const data = useLoaderData<typeof loader>();

  return (
    <StaffShell
      navigation={[
        { name: 'Home', href: '/home', current: true },
        { name: 'Programs', href: '/programs', current: true },
      ]}
      appUser={data.appUser}
    >
      <Outlet />
    </StaffShell>
  );
}