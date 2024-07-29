import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getServiceTransactionData } from "./data-fetchers";
import { InvoicePage } from "./componets/invoice-page";
import { StandardError } from "~/components/shell/page-error";



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



export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    const err = {
      name: error.status.toString(),
      message: error.statusText,
    }
    return <StandardError error={err} />;
  }
  else if (error instanceof Error) {
    return (
      <div>
        <h1>Error2</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
