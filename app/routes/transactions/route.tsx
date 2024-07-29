import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { UIShell } from "~/components/shell/ui-shell";
import { protectedRoute } from "~/lib/auth/auth.server";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { appUser } = await protectedRoute(request);
  return json({ appUser });
};


export default function TransactionsRoute() {
  const { appUser } = useLoaderData<typeof loader>()
  return (
    <UIShell
      appUser={appUser}
    >
      <Outlet />
    </UIShell>
  )
}

