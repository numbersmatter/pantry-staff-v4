import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { UIShell } from "~/components/shell/ui-shell";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);
  return json({ appUser });
};

export default function Layout() {
  const data = useLoaderData<typeof loader>();

  return (
    <UIShell
      appUser={data.appUser}
    >
      <Outlet />
    </UIShell>
  );
}