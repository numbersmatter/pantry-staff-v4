import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import { action } from "../route";
import { FormTextField } from "~/components/forms/textfield";
import { DatePickerWithRange, DateRangeField } from "~/components/forms/date-picker";
import { SelectField } from "~/components/forms/select-field";
import { FormTextArea } from "~/components/forms/text-area";
import { Calendar } from "~/components/ui/calendar";



export function WeekPlanDialog() {
  const fetcher = useFetcher<typeof action>()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create New Weekplan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <fetcher.Form method="post">
          <DialogHeader>
            <DialogTitle>Create New Weekplan</DialogTitle>
            <DialogDescription>
              This will create a new weekplan for the staff to follow.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormTextField id="title" label="Week Plan Title" />
            <FormTextArea id="description" label="Week Plan Description" />
            <Calendar />
          </div>
          <DialogFooter>
            <div className="w-full flex justify-between">
              <DialogClose>
                cancel
              </DialogClose>
              <Button name="type" value="create_weekplan">
                Create
              </Button>
            </div>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>

  )
}