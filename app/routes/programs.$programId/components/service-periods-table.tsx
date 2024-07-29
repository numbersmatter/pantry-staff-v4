import { StandardContainer } from "~/components/common/containers";
import { DataTable } from "~/components/common/data-table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";
import { Link, useLoaderData } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { CreatePeriodDialog } from "./create-period-dialog";


interface ServicePeriodCols {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}


const columns: ColumnDef<ServicePeriodCols>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => <Link to={`/service-periods/${row.original.id}`}>{row.original.name}</Link>,
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => row.original.description,
  },
  {
    id: "start_date",
    header: "Start Date",
    cell: ({ row }) => row.original.start_date,
  },
  {
    id: "end_date",
    header: "End Date",
    cell: ({ row }) => row.original.end_date,
  }
];




export default function ServicePeriodTable() {
  const { columnData } = useLoaderData<typeof loader>();
  return (
    <StandardContainer>
      <Card>
        <CardHeader>
          <CardTitle>
            Service Periods
          </CardTitle>
          <CardDescription>
            A list of all the service periods in this program.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-3 sm:flex sm:items-center">
            <div className="sm:flex-auto">

              {/* <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name, title, email and role.
              </p> */}
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

            </div>
          </div>
          <DataTable columns={columns} data={columnData} />
        </CardContent>
        <CardFooter>
          <Link to="service-periods">
            <Button>
              Add Service Period
            </Button>
          </Link>
        </CardFooter>
      </Card>

    </StandardContainer>
  )
}