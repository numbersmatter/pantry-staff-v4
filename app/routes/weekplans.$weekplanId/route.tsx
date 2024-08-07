import { Outlet, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getWeekplanData } from "./data-fetchers";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const weekplanId = params.weekplanId ?? "weekplanId";

  const weekplan = await getWeekplanData(weekplanId);

  return json({ weekplan });
};



export default function WeekPlan() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}




function Header() {
  const { weekplan } = useLoaderData<typeof loader>();
  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Weekplan: {weekplan.title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {weekplan.description}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

        </div>
      </div>
    </div>
  )
}