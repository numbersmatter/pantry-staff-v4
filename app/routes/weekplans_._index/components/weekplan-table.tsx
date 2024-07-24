import { ColumnDef } from "@tanstack/react-table";
import { loader } from "../route";
import { Link, useLoaderData } from "@remix-run/react";
import { DataTable } from "~/components/common/data-table";



interface WeekplanCols {
  title: string;
  description: string;
  id: string;
}


const weekplanCols: ColumnDef<WeekplanCols>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => {
      return (
        <Link to={`/weekplans/${row.original.id}`}>
          Go To Weekplan
        </Link>
      )
    },
  },
];




export function WeekplanTable() {
  const { weekplans } = useLoaderData<typeof loader>();

  return (
    <div>
      <DataTable columns={weekplanCols} data={weekplans} />
    </div>
  )
}