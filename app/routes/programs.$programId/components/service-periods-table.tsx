import { StandardContainer } from "~/components/common/containers";
import { DataTable } from "~/components/common/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";
import { Link, useLoaderData } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";


interface ServicePeriodCols {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
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
  {
    id: "start_date",
    header: "Start Date",
    cell: ({ row }) => row.original.start_date,
  },
  {
    id: "end_date",
    header: "End Date",
    cell: ({ row }) => row.original.end_date,
  }
];




export default function ServicePeriodTable() {
  const { columnData } = useLoaderData<typeof loader>();
  return (
    <StandardContainer>
      <Card>
        <CardHeader>
          <CardTitle>
            Service Periods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={columnData} />
        </CardContent>
      </Card>

    </StandardContainer>
  )
}