import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card"
import { loader } from "../route";


function PreviewCard() {
  const { previewData } = useLoaderData<typeof loader>();
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
          <Button variant="link">Back</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export { PreviewCard }