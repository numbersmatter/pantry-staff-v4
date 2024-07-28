import { Link, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { loader as weekplanLoader } from "~/routes/weekplans.$weekplanId/route"
import { loader } from "../route";
import { Button } from "~/components/ui/button";

export type Vstep = {
  name: string;
  description: string;
  to: string;
  status: 'complete' | 'current' | 'upcoming';
  id: string;
}




export function TasksOnDayCard() {

  const weekplanIdpath = "routes/weekplans.$weekplanId";
  const data = useRouteLoaderData<typeof weekplanLoader>(weekplanIdpath)
  const { day } = useLoaderData<typeof loader>();
  const weekplan = data?.weekplan


  if (!weekplan) {
    return <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  }
  const taskStatus = data.weekplan.taskStatus

  const selectedDay = day as keyof typeof weekplan.taskDay;


  const tasksOnDay = weekplan.taskDay[selectedDay]
  const tasks = weekplan.tasks;


  const dayStatusIncomplete = taskStatus[selectedDay].incomplete;
  const taskSteps = tasksOnDay.map((taskId) => {
    const task = tasks[taskId] ?? {
      title: "Error Title",
      description: "error description",
    };

    return {
      name: task.title,
      description: task.description,
      to: `/weekplans/${weekplan.id}/task/${task.id}`,
      status: dayStatusIncomplete.includes(task.id) ? "upcoming" : "complete",
      id: task.id,
    } as Vstep;
  });

  const backToWeek = `/weekplans/${weekplan.id}`

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <nav aria-label="Progress" className="">
        <ol className="overflow-hidden">
          <li className="relative pb-10">
            <LinkToWeek to={backToWeek} />
          </li>
          {taskSteps.map((step: Vstep, stepIdx) => (
            <li key={step.id} className={cn(stepIdx !== taskSteps.length - 1 ? 'pb-10' : '', 'relative')}>
              {step.status === 'complete' ? (
                <>
                  {stepIdx !== taskSteps.length - 1 ? (
                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600" aria-hidden="true" />
                  ) : null}
                  <Link to={step.to} className="group relative flex items-start">
                    <span className="flex h-9 items-center">
                      <span className="relative z-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                        <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium">{step.name}</span>
                      <span className="text-sm text-gray-500">{step.description}</span>
                    </span>
                  </Link>
                </>
              ) : step.status === 'current' ? (
                <>
                  {stepIdx !== taskSteps.length - 1 ? (
                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                  ) : null}
                  <Link to={step.to} className="group relative flex items-start" aria-current="step">
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-indigo-600">{step.name}</span>
                      <span className="text-sm text-gray-500">{step.description}</span>
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  {stepIdx !== taskSteps.length - 1 ? (
                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                  ) : null}
                  <Link to={step.to} className="group relative flex items-start">
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className="relative z-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-gray-500">{step.name}</span>
                      <span className="text-sm text-gray-500 text-ellipsis overflow-hidden">
                        {step.description}
                      </span>
                    </span>
                  </Link>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}


function LinkToWeek({ to }: { to: string }) {

  return (
    <Link to={to} >
      <Button>
        Back to Week
      </Button>
    </Link>
  )
}