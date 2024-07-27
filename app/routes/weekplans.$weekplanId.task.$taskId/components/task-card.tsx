import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card"
import { loader } from "../route";
import { TaskSteps } from "./task-steps";


export function TaskCard() {
  const data = useLoaderData<typeof loader>();


  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {data.currentTask.title}
          </CardTitle>
          <CardDescription>
            {data.currentTask.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {
            // helperText ? <p>{helperText}</p> : null
          }
          <TaskSteps />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Form method="post">
            <Button variant={"secondary"} name="_action" value="toDayPage" >
              Back To Day
            </Button>
          </Form>
          <Form method="post" className="flex py-4 justify-end">
            <input type="hidden" name="taskId" value={"currentTask.id"} />
            <input type="hidden" name="mark" value={"value"} />
            <Button name="_action" value="toggleComplete" type="submit">
              Mark Complete
            </Button>
          </Form>

        </CardFooter>
      </Card>
      {/* <pre>{JSON.stringify(data.weekplan.dataEntry, null, 2)}</pre> */}    </div>

  )
}