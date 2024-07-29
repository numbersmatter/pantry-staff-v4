import { LoaderFunctionArgs, json } from "@remix-run/node";
import { isRouteErrorResponse, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { StandardError } from "~/components/shell/page-error";
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


export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    const err = {
      name: error.status.toString(),
      message: error.statusText,
    }
    return <StandardError error={err} />;
  }
  return <div />
}


