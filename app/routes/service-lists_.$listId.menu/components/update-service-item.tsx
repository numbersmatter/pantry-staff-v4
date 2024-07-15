import { useFetcher, useLoaderData } from "@remix-run/react";
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
import { action, loader } from "../route";
import { useEffect, useState } from "react";
import { FormTextField } from "~/components/forms/textfield";
import { FormNumberField } from "~/components/forms/number-field";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";



export function UpdateServiceItemDialog({
  item_id,
}: {
  item_id: string,
}) {
  const loaderData = useLoaderData<typeof loader>();
  let fetcher = useFetcher<typeof action>();
  const [open, setOpen] = useState(false);

  // const actionUrl = `/service-lists/${listId}?index`

  let listId = loaderData.listId;
  let itemData = loaderData.items.find((i) => i.item_id === item_id);

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
          Update
        </Button>
      </DialogTrigger>

      <DialogContent className="">
        <fetcher.Form method="post" >
          <DialogHeader>
            <DialogTitle>Update Item</DialogTitle>
            <DialogDescription>
              Update item or delete it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <input readOnly hidden name="service_list_id" value={listId} />
            <input readOnly hidden name="item_id" value={item_id} />
            <FormTextField
              label="Name"
              id="name"
              defaultValue={itemData?.item_name}
              error={nameError}
            />
            <FormNumberField
              label="Quantity"
              id="quantity"
              defaultValue={itemData?.quantity}
              error={quantityError}
            />
            <ReminderText />
            <FormNumberField
              label="Unit Value"
              id="value"
              defaultValue={itemData?.value}
              error={valueError}
            />
          </div>
          <div className="grid grid-cols-1">
            {/* <pre>{JSON.stringify(actionData, null, 2)}</pre> */}
          </div>

          <DialogFooter className="gap-3 sm:justify-between">
            <Button
              name="type"
              value="deleteItem"
              type="submit"
              variant={"destructive"}
            >
              Delete
            </Button>
            <Button
              name="type"
              value="updateItem"
              type="submit"
              variant={"default"}
            >
              Update
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

