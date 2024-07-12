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
import { FormTextField } from "~/components/forms/textfield";



export function CreateListDialog({
  periodId,
}: {
  periodId: string,
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
          New Service List
        </Button>
      </DialogTrigger>

      <DialogContent className="">
        <fetcher.Form method="post" >
          <DialogHeader>
            <DialogTitle>Create New Service List</DialogTitle>
            <DialogDescription>
              Service lists are used to track the delivery of services to families.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <input readOnly hidden name="type" value="createList" />
            <input readOnly hidden name="service_period_id" value={periodId} />
            <FormTextField
              label="Name"
              id="name"
              error={inputError.find((e) => e.field === "name")?.message}
            />
            <FormTextArea
              label="Description"
              id="description"
              error={inputError.find((e) => e.field === "description")?.message}
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