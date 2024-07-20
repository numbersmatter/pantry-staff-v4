import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import { action } from "../route";
import { useEffect, useState } from "react";
import { FormTextField } from "~/components/forms/textfield";
import { FormNumberField } from "~/components/forms/number-field";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";



export function AddServiceItemDialog({
  listId,
}: {
  listId: string,
}) {
  let fetcher = useFetcher<typeof action>();
  const [open, setOpen] = useState(false);



  let actionData = fetcher.data;
  let isFetching = fetcher.state !== "idle";
  let isSuccess = actionData ? actionData.success : false;
  let inputErrors = actionData?.inputErrors ?? [];

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setOpen(false);
    }
  }, [isSuccess, isFetching])


  const nameError = inputErrors.find((e) => e.field === "name")?.message;
  const quantityError = inputErrors.find((e) => e.field === "quantity")?.message;
  const valueError = inputErrors.find((e) => e.field === "value")?.message;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          Add Item
        </Button>
      </DialogTrigger>

      <DialogContent className="">
        <fetcher.Form method="post" >
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
            <DialogDescription>
              Service lists are used to track the delivery of services to families.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <input readOnly hidden name="type" value="addItem" />
            <input readOnly hidden name="service_list_id" value={listId} />
            <FormTextField
              label="Name"
              id="name"
              error={nameError}
            />
            <FormNumberField
              label="Quantity"
              id="quantity"
              error={quantityError}
            />
            <ReminderText />
            <FormNumberField
              label="Unit Value"
              id="value"
              error={valueError}
            />
          </div>
          <div className="grid grid-cols-1">
            {/* <pre>{JSON.stringify(actionData, null, 2)}</pre> */}
          </div>

          <DialogFooter>
            <Button type="submit" variant={"default"}>
              Add
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>

    </Dialog>
  );
}

function ReminderText() {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Reminder
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Unit value should be given in cents: Example &quot;100&quot; would be equal to $1.00
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

