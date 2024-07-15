import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { checkListStatus, getHistoryData } from "./data-fetchers";
import { ServiceListHistoryTable } from "./components/history-table";





export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const listId = params.listId ?? "listId";
  const { list } = await checkListStatus(listId);

  const historyData = await getHistoryData(list);
  return json({ historyData });
};



export default function ServiceListStatusPage() {

  return (
    <div>
      <ServiceListHistoryTable />
    </div>
  )
}

