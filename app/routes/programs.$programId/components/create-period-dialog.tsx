import { useFetcher } from "@remix-run/react";
import { FormTextField } from "~/components/forms/textfield";
import { Button } from "~/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { action } from "../route";
import { FormTextArea } from "~/components/forms/text-area";
import { DatePicker, DatePickerWithRange } from "~/components/forms/date-picker";
import { Label } from "~/components/ui/label";
import { useState } from "react";

export function CreatePeriodDialog() {
  const fetcher = useFetcher<typeof action>();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button>
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]"
        onInteractOutside={(e) => { e.preventDefault() }}
      >
        <DialogHeader>
          <DialogTitle>Create New Period</DialogTitle>
          <DialogDescription>
            Create a new period for this service.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form method="post">
          <FormTextField
            label="Name"
            id="name"
          />
          <FormTextArea
            label="Description"
            id="description"
          />
          <div className="grid grid-cols-1 gap-2 pb-1 md:grid-cols-4 md:items-center md:gap-4">
            <Label htmlFor="start_date">Start Date</Label>
            <DatePicker id="start_date" />
          </div>
          <div className="grid grid-cols-1 gap-2 pb-1 md:grid-cols-4 md:items-center md:gap-4">
            <Label htmlFor="end_date">End Date</Label>
            <DatePicker id="end_date" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )

}