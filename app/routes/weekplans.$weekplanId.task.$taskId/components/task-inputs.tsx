import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { action, loader } from "../route";
import { FormNumberField } from "~/components/forms/number-field";
import { FormTextArea } from "~/components/forms/text-area";
import { FormTextField } from "~/components/forms/textfield";




function handleErrors({ taskId }: { taskId: string }) {




  return {} as Record<string, string>;

}


export function DialogFormSingleNumberInput({
  label,
  title,
  description,
  defaultNumber,
  submitUrl,
}: {
  label: string,
  title: string,
  description: string,
  defaultNumber: number,
  submitUrl: string,
}) {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const [open, setOpen] = useState(false);
  const actionData = fetcher.data;
  const isFetching = fetcher.state !== "idle";
  const isSuccess = actionData ?
    actionData.success :
    false;


  const errorData = handleErrors({ taskId: loaderData.taskId })

  const idError = errorData.idError?.[0] ?? "";
  const numberEnteredError = errorData.numberEntered?.[0] ?? "";



  useEffect(() => {
    if (isSuccess && !isFetching) {
      setOpen(false)
    }
  }, [isSuccess, isFetching])


  return <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
      <Button>
        {title}
      </Button>
    </DialogTrigger>
    <DialogContent className="">
      <fetcher.Form action={submitUrl} method="POST" className="mx-auto w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {
            idError ? <div className="bg-red-200 p-2 text-red-800 text-sm">{idError}</div> : null
          }
          <FormNumberField
            id="numberEntered"
            label={label}
            defaultValue={defaultNumber}
            error={numberEnteredError}
          />
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between">
            <DialogClose>
              cancel
            </DialogClose>
            <Button type="submit">
              Submit
            </Button>
          </div>
        </DialogFooter>
      </fetcher.Form>
      {
        actionData ? <pre className="p-4">{JSON.stringify(actionData, null, 2)}</pre> : null
      }
    </DialogContent>
  </Dialog>
}
export function DialogFormSingleTextInput({
  label,
  title,
  description,
  defaultText,
  submitUrl,
  textarea,
}: {
  textarea: boolean,
  label: string,
  title: string,
  description: string,
  defaultText: string,
  submitUrl: string,
}) {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const [open, setOpen] = useState(false);
  const actionData = fetcher.data;
  const isFetching = fetcher.state !== "idle";
  const isSuccess = actionData ?
    actionData.success :
    false;

  const errorData = handleErrors({ taskId: loaderData.taskId })
  const idError = errorData.idError?.[0] ?? "";
  const textEnteredError = errorData.textEntered?.[0] ?? "";

  useEffect(() => {
    if (isSuccess && !isFetching) {
      setOpen(false)
    }
  }, [isSuccess, isFetching])


  return <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
      <Button>
        {title}
      </Button>
    </DialogTrigger>
    <DialogContent className="">
      <fetcher.Form action={submitUrl} method="POST" className="mx-auto w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {
            idError ? <div className="bg-red-200 p-2 text-red-800 text-sm">{idError}</div> : null
          }
          {
            textarea ? <FormTextArea
              id="textEntered"
              label={label}
              defaultValue={defaultText}
              error={textEnteredError}

            /> :
              <FormTextField
                id="textEntered"
                label={label}
                defaultValue={defaultText}
                error={textEnteredError}
              />
          }
        </div>
        <DialogFooter>
          <div className="w-full flex justify-between">
            <DialogClose>
              cancel
            </DialogClose>
            <Button type="submit">
              Submit
            </Button>
          </div>
        </DialogFooter>
      </fetcher.Form>
      {/* {
        actionData ? <pre className="p-4">{JSON.stringify({ actionData, errorData }, null, 2)}</pre> : null
      } */}
    </DialogContent>
  </Dialog>
}


