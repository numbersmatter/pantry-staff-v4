import { ColumnDef } from "@tanstack/react-table";

interface UpdateSeatsCols {
  seat_id: string;
  transactionId: string;
  current_value: number;
  new_value: number;
}

const dollarValueConverter = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const dollar = value * 0.01;

  return formatter.format(dollar);
};

export const updateSeatsCols: ColumnDef<UpdateSeatsCols>[] = [
  {
    accessorKey: "seat_id",
    header: "Seat ID",
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "current_value",
    header: "Current Value",
    cell: ({ row }) => {
      const dollarValue = dollarValueConverter(row.original.current_value)
      return (
        <span>{dollarValue}</span>
      )
    }
  },
  {
    accessorKey: "new_value",
    header: "New Value",
    cell: ({ row }) => {
      const dollarValue = dollarValueConverter(row.original.new_value)
      return (
        <span>{dollarValue}</span>
      )
    }
  }
]

