import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { FormTextField } from "~/components/forms/textfield";
import { SelectField } from "~/components/forms/select-field";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { action, loader } from "../route";
import { FormTextArea } from "~/components/forms/text-area";





export function AddProgramDialog() {
  const { programAreaOptions } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>()
  const actionData = fetcher.data
  const errors = actionData?.errors ?? []
  const nameError = errors.find((error) => error.path.includes("name"))
  const areaError = errors.find((error) => error.path.includes("program_area_id"))

  const criteriaError = errors.find((error) => error.path.includes("criteria"))


  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Add Program</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <fetcher.Form method="post" className="grid gap-4 py-4 ">
          <DialogTitle>Add Program</DialogTitle>
          <DialogDescription>
            Add a new program to the system.
          </DialogDescription>
          <FormTextField label="Name" id="name" error={nameError?.message} />
          <div>

            <SelectField
              label={"Program Area"}
              id={"program_area_id"}
              selectOptions={programAreaOptions}
              placeholder={"Choose Program Area"}
            />
            {
              areaError && (
                <p className="text-red-600 text-sm">{areaError.message}</p>
              )
            }
          </div>
          <FormTextArea label="Criteria" id="criteria"
            error={criteriaError?.message}
          />
          <DialogFooter className="justify-between">
            <DialogClose asChild>
              <Button type={"button"} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type={"submit"} name="type" value="add_program">
              Add Program
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog >
  )
}