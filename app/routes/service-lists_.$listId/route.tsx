import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { UIShell } from "~/components/shell/ui-shell";
import { protectedRoute } from "~/lib/auth/auth.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);
  return { appUser };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  return null;
};


export default function ServiceListPageLayout() {
  const { appUser } = useLoaderData<typeof loader>();
  return (
    <UIShell
      appUser={appUser}
    >
      <Outlet />
    </UIShell>
  );
}