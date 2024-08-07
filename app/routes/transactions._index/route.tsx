import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {

  return json({});
};


export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};


export default function TransactionIndexRoute() {
  const data = useLoaderData()
  return (
    <div className=" px-3 py-2 prose">
      <h1>Transaction Index</h1>
    </div>
  );
}