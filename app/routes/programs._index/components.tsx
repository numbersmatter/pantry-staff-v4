import { Link, useFetcher } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/common/data-table";
import { Button } from "~/components/ui/button";


interface Program {
  id: string;
  name: string;
  program_area_name: string;
}
const programsOfAreaColumns: ColumnDef<Program>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link to={`/programs/${row.original.id}`}>
          {row.original.name}
        </Link>
      )
    }
  },
  {
    accessorKey: "program_area_name",
    header: "Program Area",
  },
  {
    id: "id",
    accessorKey: "id",
    header: "Current Period",
    cell: ({ row }) => {
      return (
        <CurrentPeriod
          actionUrl={`/programs/${row.original.id}`}
        >
          <input type="hidden" name="programID" value={row.original.id} />
          <input type="hidden" name="_action" value="goToPeriod" />

        </CurrentPeriod>
      )
    }
  }
]



function ProgramsHeader() {
  return (
    <h1>Programs</h1>
  )

}


function ProgramsList({ programsList }: { programsList: { id: string, program_area_name: string, name: string }[] }) {
  return (
    <div>
      <DataTable
        data={programsList}
        columns={programsOfAreaColumns}
      />
    </div>
  );
}







function CurrentPeriod({
  children,
  actionUrl,
}: {
  children: React.ReactNode,
  actionUrl: string
}) {
  let fetcher = useFetcher();
  return (
    <fetcher.Form method="POST" className="" action={actionUrl} >
      {children}
      <Button type="submit" variant={"ghost"} >
        View
      </Button >
    </fetcher.Form >
  )
}


export { ProgramsHeader, ProgramsList }