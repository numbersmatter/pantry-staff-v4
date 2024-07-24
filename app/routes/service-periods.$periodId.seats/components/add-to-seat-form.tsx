import { Form, useFetcher } from "@remix-run/react";
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



export function AddFamilyToSeatDialog({
  familyName, familyId
}: {
  familyName: string,
  familyId: string,
}) {
  let fetcher = useFetcher<typeof action>();
  const [open, setOpen] = useState(false);
  let actionData = fetcher.data;

  let isFetching = fetcher.state !== "idle";
  let isSuccess = actionData ? actionData.success : false;

  let errorObject = actionData?.errorObject ?? {};

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setOpen(false);
    }
  }, [isSuccess, isFetching])

  const deliveryNotesError = Object.hasOwn(errorObject, "deliveryNotes")
    // @ts-expect-error we are checking if the object has a property
    ? errorObject?.deliveryNotes
    : "";



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          Assign Seat
        </Button>
      </DialogTrigger>

      <DialogContent className="">
        <fetcher.Form method="post" >
          <DialogHeader>
            <DialogTitle>Add Family to Seat</DialogTitle>
            <DialogDescription>
              Add the {familyName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <input hidden name="type" value="assignFamilySeat" readOnly />
            <input hidden name="familyId" value={familyId} readOnly />
            <FormTextArea
              label="Delivery Notes"
              id="deliveryNotes"
              error={deliveryNotesError}
            />
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