import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { UIShell } from "~/components/shell/ui-shell";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request)
  return json({ appUser });
};



export default function FamiliesLayout() {

  const data = useLoaderData<typeof loader>();

  return (
    <UIShell
      secondaryNav={{
        name: 'Families',
        links: [
          { name: 'Add Family', to: 'add', end: true },
          // { name: 'Reporting', href: '/reporting/', current: false },
          // { name: 'Weekplans', href: '/weekplans/', current: false },
        ],
      }}
      appUser={data.appUser}
    >
      <Outlet />
    </UIShell>
  );

}