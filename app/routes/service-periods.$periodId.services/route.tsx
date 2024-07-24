import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPeriodServices } from "./data-fetchers";
import { ServiceTable } from "./componets/service-table";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const periodId = params.periodId ?? "periodId";
  const services = await getPeriodServices(periodId);
  return json({ services });
};



export default function Services() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Services</h1>
      <ServiceTable />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}