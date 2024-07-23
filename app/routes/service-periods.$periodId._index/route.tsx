import { LoaderFunctionArgs, json } from "@remix-run/node";
import { ServicePeriodDashboard } from "./components";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPageData } from "./data-fetchers";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  let periodId = params.periodId ?? "periodId";

  let { stats } = await getPageData(periodId);




  return json({ stats });
};





export default function ServicePeriodsPeriodIdIndex() {

  return (
    <>

      {/* <ServicePeriodNavMenu /> */}
      <ServicePeriodDashboard />

    </>
  )

}