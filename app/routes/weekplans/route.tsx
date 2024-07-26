import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { UIShell } from "~/components/shell/ui-shell";
import { protectedRoute } from "~/lib/auth/auth.server";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { appUser } = await protectedRoute(request);
  const weekplanId = params.weekplanId ?? "weekplanId";
  const secondaryNav = {
    name: "Weekplan Actions",
    links: [
      { name: "Week Overview", to: `/weekplans/${weekplanId}`, end: true },
    ]
  }
  return json({ appUser, secondaryNav });
};



export default function WeekplanLayOut() {
  const { appUser, secondaryNav } = useLoaderData<typeof loader>();
  return (
    <UIShell
      appUser={appUser}
      secondaryNav={secondaryNav}
    >
      <Outlet />
    </UIShell>
  )
}