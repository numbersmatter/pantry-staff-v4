import { Link } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";




export interface FamilyTablesCol {
  id: string;
  family_name: string;
  first_name: string;
  last_name: string;
}

export const FamilyIndexTable: ColumnDef<FamilyTablesCol>[] = [
  {
    accessorKey: "family_name",
    header: "Family Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "id",
    header: "Link",
    cell: ({ row }) => {
      return (
        <Link to={`/families/${row.original.id}`}>Link</Link>
      )
    }
  }
];








