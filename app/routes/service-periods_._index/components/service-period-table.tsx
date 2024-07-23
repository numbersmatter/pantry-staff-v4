import { Link, useLoaderData } from "@remix-run/react";
import { loader } from "../route";
import { DataTable } from "~/components/common/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ContainerPadded } from "~/components/common/containers";



interface ServicePeriodCols {
  name: string;
  description: string;
  id: string;
}


const columns: ColumnDef<ServicePeriodCols>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => <Link to={`/service-periods/${row.original.id}`}>{row.original.name}</Link>,
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => row.original.description,
  },
];


export function ServicePeriodTable() {
  const data = useLoaderData<typeof loader>();
  const servicePeriods = data.servicePeriodsData;

  return (
    <ContainerPadded>
      <DataTable data={servicePeriods} columns={columns} />
    </ContainerPadded>
  )
}