import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { UIShell } from "~/components/shell/ui-shell";
import { protectedRoute } from "~/lib/auth/auth.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);

  const taskMenu = {
    name: "Service List",
    links: [
      {
        name: "Service Items",
        to: `/service-lists/${params.listId}/menu`,
        end: true,
      },
      {
        name: "Seats",
        to: `/service-lists/${params.listId}/seats`,
        end: true,
      },
      {
        name: "Preview",
        to: `/service-lists/${params.listId}/preview`,
        end: true,
      }
    ],
  }
  return { appUser, taskMenu };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  return null;
};


export default function ServiceListPageLayout() {
  const { appUser, taskMenu } = useLoaderData<typeof loader>();
  return (
    <UIShell
      appUser={appUser}
      secondaryNav={taskMenu}
    >
      <Outlet />
    </UIShell>
  );
}