import { Link, useLoaderData } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "~/components/common/data-table";
import { loader } from "../route";

interface ServiceListActionsCols {
  created_date: string;
  records_created: number;
  records_updated: number;
  records_canceled: number;
  records_unchanged: number;
  id: string;
}

const serviceListActionsCols: ColumnDef<ServiceListActionsCols>[] = [
  {
    accessorKey: "created_date",
    header: "Created Date",
  },
  {
    accessorKey: "records_created",
    header: "Records Created",
  },
  {
    accessorKey: "records_updated",
    header: "Records Updated",
  },
  {
    accessorKey: "records_canceled",
    header: "Records Canceled",
  },
  {
    accessorKey: "records_unchanged",
    header: "Records Unchanged",
  },
  // {
  //   id: "id",
  //   accessorKey: "id",
  //   header: "Link",
  //   cell: ({ row }) => {
  //     return (
  //       <Link to={`/service-lists/${row.original.id}`}>Go to List</Link>
  //     )
  //   }
  // }

]


export function ServiceListHistoryTable() {
  const { historyData } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto py-4 prose sm:px-2 lg:px-6">
      <h2>History</h2>
      <DataTable columns={serviceListActionsCols} data={historyData} />
    </div>
  )
}