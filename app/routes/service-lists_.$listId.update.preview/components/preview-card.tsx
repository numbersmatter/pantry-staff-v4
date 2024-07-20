import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card"
import { action, loader } from "../route";
import { DataTable } from "~/components/common/data-table";
import { updateSeatsCols } from "./data-tables";


function PreviewCard() {
  const { previewData, listId, backLink } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>()
  const {
    serviceType,
    numberOfRecords,
    cancelled_records,
    update_transactions,
    new_records,
    title
  } = previewData;

  return (
    <div className="container mx-auto py-4 sm:px-6 lg:px-8">
      {/* Content goes here */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Update {title} list</CardTitle>
          <CardDescription>
            This will update transactions created for this list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose">
            <h4>New Records</h4>
            <p>This action will create new records for:</p>
            {
              new_records.length === 0 && <p>No new records will be created</p>
            }
            <ul>
              {
                new_records.map((seat) => {
                  return <li key={seat}>{seat}</li>
                })
              }
            </ul>
          </div>
          <hr className="my-4" />
          <div className="prose">
            <h4>Cancelled Records</h4>
            <p>This action will cancel the following records:</p>
            <DataTable columns={updateSeatsCols} data={cancelled_records} />
          </div>
          <hr className="my-4" />
          <div className="prose ">
            <h4>Updated Records</h4>
            <p>This action will update the following records:</p>
            <DataTable columns={updateSeatsCols} data={update_transactions} />
          </div>

        </CardContent>
        <CardFooter className="flex flex-row justify-between" >
          <Link to={backLink}>Back</Link>
          <fetcher.Form method="post">
            <input type="hidden" name="actionType" value="applyServiceList" />
            <input type="hidden" name="serviceListID" value={listId} />
            <Button type="submit" variant="default">
              Apply
            </Button>
          </fetcher.Form>
        </CardFooter>
      </Card>
    </div>
  )
}

export { PreviewCard }