import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getServiceTransactionData } from "./data-fetchers";
import { InvoicePage } from "./componets/invoice-page";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const serviceId = params.serviceId ?? "no-id";

  const serviceData = await getServiceTransactionData({ serviceId: serviceId });
  return json({ ...serviceData });
};



export default function TransactionServiceIdRoute() {
  const data = useLoaderData();
  return (
    <>
      <InvoicePage />
    </>
  );
}