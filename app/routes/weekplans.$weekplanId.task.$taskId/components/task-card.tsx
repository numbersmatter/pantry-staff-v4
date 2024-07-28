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
  const weekplanId = data.weekplanId;
  const taskId = data.taskId;
  const markValue = data.markValue

  const incomplete = markValue === "incomplete";

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
            <input type="hidden" name="taskId" value={taskId} readOnly />
            <input type="hidden" name="weekplanId" value={weekplanId} readOnly />
            <Button variant={"secondary"} name="type" value="go_to_day" >
              Back To Day
            </Button>
          </Form>
          <Form method="post" className="flex py-4 justify-end">
            <input type="hidden" name="taskId" value={taskId} readOnly />
            <input type="hidden" name="weekplanId" value={weekplanId} readOnly />
            <input type="hidden" name="markValue" value={markValue} readOnly />
            <Button variant={incomplete ? "destructive" : "default"} name="type" value="toggle_complete" type="submit">
              {markValue === "complete" ? "Mark Complete" : "Mark InComplete"}
            </Button>
          </Form>

        </CardFooter>
      </Card>
      {/* <pre>{JSON.stringify(data.weekplan.dataEntry, null, 2)}</pre> */}    </div>

  )
}