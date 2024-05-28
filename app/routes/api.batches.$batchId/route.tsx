import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { StaffShell } from "~/components/shell/staff-shell";




export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request)
  const { batchId } = params;

  const baseUri = `/api/batches/${batchId}`;

  const nav = [
    { name: 'Home', href: '/home', current: false },
    { name: 'Basics', href: `${baseUri}`, current: true },
    { name: 'Add Seats', href: `${baseUri}/seats`, current: true },
    { name: 'Menu', href: `${baseUri}/menu`, current: true },
  ]


  return json({ nav, appUser });
};

export default function BatchIDRoute() {
  const data = useLoaderData<typeof loader>();

  const { nav, appUser } = data;

  return (
    <StaffShell navigation={nav} appUser={appUser}>
      <Outlet />
    </StaffShell>
  )
}

function BatchCard() {

}