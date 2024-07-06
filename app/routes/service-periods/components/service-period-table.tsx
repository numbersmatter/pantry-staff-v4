import { useLoaderData } from "@remix-run/react";
import { loader } from "../route";
import { DataTable } from "~/components/common/data-table";



export function ServicePeriodTable() {
  const data = useLoaderData<typeof loader>();

  return (
    <DataTable data={[]} columns={[]} />
  )
}