import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";

import { protectedRoute } from "~/lib/auth/auth.server";
import { getBatches } from "../api.batches._index/data-fetch.server";
import { BatchCard } from "./componets";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request)

  const batches = await getBatches()
  const batch = batches[0]
  return json({ batch });
};

export default function BatchIndexRoute() {

  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <BatchCard batch={data.batch} />
    </div>
  )
}

