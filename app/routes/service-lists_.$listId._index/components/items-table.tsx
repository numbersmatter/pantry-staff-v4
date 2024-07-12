import { Link, useLoaderData } from "@remix-run/react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TableType,
  // VisibilityState,
  flexRender,
  getCoreRowModel,
  // getFacetedRowModel,
  // getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { loader } from "../route"
import { StandardContainer } from "~/components/common/containers"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

interface ItemTableCols {
  id: string;
  name: string;
  quantity: number;
  unitValue: number;
}


const serviceItemsCols: ColumnDef<ItemTableCols>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "quantity",
    accessorFn: (row) => row.quantity,
    cell: ({ row }) => {
      return (
        <div className="grid grid-cols-1 justify-items-center">
          {
            row.original.quantity
          }
        </div>
      )
    },
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowsUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "unitValue",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit Value
          <ArrowsUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="grid grid-cols-1 justify-items-center">
          {
            row.original.unitValue
          }
        </div>
      )
    }
  },
  {
    id: "totalValue",
    accessorFn: (row) => row.quantity * row.unitValue,
    header: "Total Value",
  },
  {
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      return (
        <p>menu</p>
      )
    }
  }
]


function ItemsDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Last Name..."
          value={(table.getColumn("caregiver_last_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("caregiver_last_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}









export function ItemsTable() {
  let data = useLoaderData<typeof loader>();

  const itemsData = data.items.map(item => {
    return {
      id: item.item_id,
      name: item.item_name,
      quantity: item.quantity,
      unitValue: item.value
    }
  })
  return (
    <StandardContainer>
      <ItemsDataTable
        columns={serviceItemsCols}
        data={itemsData}
      />
    </StandardContainer>
  )

}





