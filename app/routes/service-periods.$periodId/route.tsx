import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Header, ServicePeriodDashboard, ServicePeriodNavMenu } from "./components";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPageData } from "./data-fetchers";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  let periodId = params.periodId ?? "periodId";

  let { stats } = await getPageData(periodId);



  return json({ stats });
};



export default function ServicePeriod() {
  // let data = useLoaderData<typeof loader>();


  return (
    <>
      <Header />
      <ServicePeriodNavMenu />
      <ServicePeriodDashboard />
    </>
  )
}
