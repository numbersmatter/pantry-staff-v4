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
import { FormTextArea } from "~/components/forms/text-area";
import { useEffect, useState } from "react";
import { FormTextField } from "~/components/forms/textfield";



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

  let inputError = actionData?.inputErrors ?? [];

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setOpen(false);
    }
  }, [isSuccess, isFetching])




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
            <input readOnly hidden name="type" value="createList" />
            <input readOnly hidden name="listId" value={listId} />
            <FormTextField
              label="Name"
              id="name"
            // error={inputError.find((e) => e.field === "name")?.message}
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