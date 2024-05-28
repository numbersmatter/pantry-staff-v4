import { Link } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";


interface BatchColumns {
  id: string;
  name: string;
  program: {
    name: string;
    id: string;
  }
  "service-date": string;
}

export const batchesTableColumns: ColumnDef<BatchColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link to={`/api/batches/${row.original.id}`}>
          {row.original.name}
        </Link>
      )
    }
  },
  {
    accessorKey: "program",
    header: "Program",
    cell: ({ row }) => {
      return (
        <div>
          <HoverCard>
            <HoverCardTrigger>
              <div className="truncate max-w-24">
                {row.original.program.name}
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              {row.original.program.name}
            </HoverCardContent>
          </HoverCard>
        </div>
      )
    }
  },
  {
    accessorKey: "service-date",
    header: "Service Date",
    cell: ({ row }) => {
      return (
        <span >
          {row.original["service-date"]}
        </span>
      )
    }
  },

]
