import { DataTable } from "~/components/common/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@remix-run/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";

interface Program {
  id: string;
  name: string;
  criteria: string;
  program_area_id: string;
  program_area_name: string;
}

export const programsTableColumns: ColumnDef<Program>[] = [
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
    accessorKey: "criteria",
    header: "Criteria",
    cell: ({ row }) => {
      return (
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <div className="truncate max-w-24">
                {row.original.criteria}
              </div>

            </HoverCardTrigger>
            <HoverCardContent>
              {row.original.criteria}

            </HoverCardContent>
          </HoverCard>
        </div>
      )
    }
  },
  {
    accessorKey: "program_area_id",
    header: "Program Area",
    cell: ({ row }) => {
      return (
        <span >
          {row.original.program_area_name}
        </span>
      )
    }
  },

]




function ProgramsTable({ programs }: {
  programs: Program[]
}) {

  return <DataTable
    columns={programsTableColumns}
    data={programs}
  />
}