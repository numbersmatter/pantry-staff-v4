import { Link, useLoaderData } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/common/data-table";
import { loader } from "../route";
import { Button } from "~/components/ui/button";

interface ServiceTableCols {
  id: string;
  value: number;
  memo: string;
  delivered_to: string;
}

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const serviceTableCols: ColumnDef<ServiceTableCols>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => {
      return (
        <Link to={`/transactions/${row.original.id}`}>
          <Button variant="secondary">
            {row.original.id}
          </Button>
        </Link>
      )
    }
  },
  {
    header: "Value",
    accessorKey: "value",
    cell: ({ row }) => {
      return (
        <div className="grid grid-cols-1 justify-items-center">
          <p> {`$${row.original.value / 100}`}</p>
        </div>
      )
    }
  },
  {
    header: "Memo",
    accessorKey: "memo",
    cell: ({ row }) => {
      return (
        <div className="grid grid-cols-1 justify-items-center">
          <p>{row.original.memo}</p>
        </div>
      )
    }
  },
  {
    header: "Delivered To",
    accessorKey: "delivered_to",
  },
];



export function ServiceTable() {
  const { services } = useLoaderData<typeof loader>();

  return (
    <div className="px-2">
      <DataTable columns={serviceTableCols} data={services} />
    </div>
  )
}