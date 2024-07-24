import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { UIShell } from "~/components/shell/ui-shell";
import { protectedRoute } from "~/lib/auth/auth.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { appUser } = await protectedRoute(request);
  return json({ appUser });
};



export default function WeekplanLayOut() {
  const { appUser } = useLoaderData<typeof loader>();
  return (
    <UIShell
      appUser={appUser}

    >
      <Outlet />
    </UIShell>
  )
}