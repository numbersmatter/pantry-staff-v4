import { Link, useLoaderData } from "@remix-run/react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
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
import { Checkbox } from "~/components/ui/checkbox"
import { StandardContainer } from "~/components/common/containers"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline"
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

interface ServicePeriodSeatsCols {
  id: string;
  family_name: string;
  caregiver_last_name: string;
  caregiver_email: string;
  enrolled_date: Date | string;
}


export const seatsOfServicePeriod: ColumnDef<ServicePeriodSeatsCols>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "family_name",
    header: "Name",
  },
  {
    id: "enrolled",
    accessorFn: (row) => row.enrolled_date === "Not Enrolled" ? 0 : 1,
    cell: ({ row }) => {
      return (
        <div className="grid grid-cols-1 justify-items-center">
          {
            row.original.enrolled_date === "Not Enrolled" ?
              <XCircleIcon className="h-5 text-red-500 " />
              : <CheckBadgeIcon className="h-5 text-green-500" />
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
          Enrolled
          <ArrowsUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "caregiver_last_name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowsUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "enrolled_date",
    header: "Enrollment Date",
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      return (
        <Link to={`${row.original.id}`}>Link</Link>
      )
    }
  }
]


export function FamilyIndexTable<TData, TValue>({
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Last Name..."
          value={(table.getColumn("caregiver_last_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("caregiver_last_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
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









export function SeatsTable() {
  let data = useLoaderData<typeof loader>();

  const familiesData = data.families.map(family => {
    return {
      id: family.id,
      family_name: family.name,
      caregiver_last_name: family.primaryCareGiver.last_name,
      caregiver_email: family.primaryCareGiver.email,
      enrolled_date: family.enrolled_date
        ? new Date(family.enrolled_date).toDateString() : "Not Enrolled",
    }
  }
  )

  const seatsData = data.seatData.map(seat => {
    return {
      id: seat.id,
      family_name: seat.family_name,
      enrolled_date: new Date(seat.enrolled_date),
      number_of_members: seat.number_of_members,
    }
  })

  return (
    <StandardContainer>
      <FamilyIndexTable
        columns={seatsOfServicePeriod}
        data={familiesData}
      />
    </StandardContainer>
  )

}





