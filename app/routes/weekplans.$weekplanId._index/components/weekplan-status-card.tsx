import { useRouteLoaderData } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@remix-run/react";
import { loader as weekplanLoader } from "~/routes/weekplans.$weekplanId/route";
import invariant from "tiny-invariant";
import { captialize } from "~/lib/utils";


export function WeekPlanStatusCard() {
  const weekplanIdpath = "routes/weekplans.$weekplanId";
  const data = useRouteLoaderData<typeof weekplanLoader>(weekplanIdpath)
  const navigate = useNavigate();
  const weekplan = data?.weekplan

  if (!weekplan) {
    return <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  }
  invariant(weekplan, "weekplan not found")

  const handleClick = (day: string) => navigate(`/weekplans/${weekplan.id}/day/${day}`)

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  const taskStatus = data.weekplan.taskStatus
  return (
    <div className="py-3">
      <Card >
        <CardHeader>
          <CardTitle>Weekplan</CardTitle>
          <CardDescription>
            {data.weekplan?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Weeklyplan</p>
          {
            days.map(day => {
              const dayTasks = taskStatus[day as keyof typeof taskStatus]
              return <div key={day} className="py-3 grid grid-cols-2 items-center gap-2">
                <Button
                  className=""
                  variant={"outline"}
                  onClick={() => handleClick(day)}
                >
                  {captialize(day)} Tasks
                </Button>
                <span>
                  {dayTasks.incomplete.length} / {dayTasks.all.length} remaining

                </span>
              </div>
            })

          }

        </CardContent>
        <CardFooter>
          <Button>
            Start Monday
          </Button>

        </CardFooter>

      </Card>
    </div>
  );
} 