import { MapIcon } from "@heroicons/react/20/solid";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { UIShell } from "~/components/shell/ui-shell";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPageData } from "./data-fetchers";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let { appUser } = await protectedRoute(request);
  const listId = params.listId ?? "listId";


  const { taskMenu, headerData, showMenu } = await getPageData(listId);



  return { appUser, taskMenu, headerData, showMenu };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  return null;
};


export default function ServiceListPageLayout() {
  const { appUser, taskMenu, showMenu } = useLoaderData<typeof loader>();

  const secondaryNav = showMenu ? taskMenu : undefined;
  return (
    <UIShell
      appUser={appUser}
      secondaryNav={secondaryNav}
    >
      <ServiceListHeader />
      <Outlet />
    </UIShell>
  );
}

function ServiceListHeader() {
  const { headerData } = useLoaderData<typeof loader>();
  return (
    <div className="min-w-0 py-2 px-2 md:px-8">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {headerData.title}
      </h2>
      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          {headerData.servicePeriod}
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          {headerData.status}
        </div>
      </div>
    </div>

  );
}