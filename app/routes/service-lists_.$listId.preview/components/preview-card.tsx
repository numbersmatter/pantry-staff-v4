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


function PreviewCard() {
  const { previewData, listId, backLink } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>()
  const { serviceType, numberOfRecords, title } = previewData;

  return (
    <div className="container mx-auto py-4 sm:px-6 lg:px-8">
      {/* Content goes here */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Apply to {title} list</CardTitle>
          <CardDescription>
            This will create individual service transactions for your seats selected.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This action will create {serviceType} transactions on {numberOfRecords.toString()} records</p>

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