import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card';
import { FormTextField } from '~/components/forms/textfield';
import { FormNumberField } from '~/components/forms/number-field';
import { FamilyAppModel } from '~/lib/database/families/types';
import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { action } from './route';



function SingleTextUpdate({
  fieldId, fieldLabel, fieldValue
}: {
  fieldId: string,
  fieldLabel: string,
  fieldValue: string
}) {
  return <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm font-medium leading-6 text-gray-900">
      {fieldLabel}
    </dt>
    <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <span className="flex-grow">
        {fieldValue}
      </span>
      <span className="ml-4 flex-shrink-0">
        <UpdateTextDialog
          fieldId={fieldId}
          fieldLabel={fieldLabel}
          fieldValue={fieldValue}
        />
      </span>
    </dd>
  </div>
}


function UpdateTextDialog({
  fieldId, fieldLabel, fieldValue
}: {
  fieldId: string,
  fieldLabel: string,
  fieldValue: string
}) {
  const fetcher = useFetcher<typeof action>();
  const [isOpen, setIsOpen] = useState(false);


  const isFetching = fetcher.state !== 'idle';
  const actionData = fetcher.data;


  useEffect(() => {
    if (actionData?.result?.success) {
      setIsOpen(false);
    }
  }
    , [actionData, isFetching])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <fetcher.Form method="POST">
          <DialogHeader className="py-2">
            <DialogTitle>{fieldLabel}</DialogTitle>
            <DialogDescription>
              Update the {fieldLabel} for this family.
            </DialogDescription>
          </DialogHeader>
          <input readOnly type="hidden" name="fieldId" value={fieldId} />
          <input readOnly type="hidden" name="type" value={"family_name"} />
          <FormTextField
            label={fieldLabel}
            id={"value"}
            defaultValue={fieldValue}
          />
          <DialogFooter >
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>


  )

}

function AddressCard({ family }: { family: FamilyAppModel }) {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle> Current Address</CardTitle>
        <CardDescription>
          Address for Service Delivery
        </CardDescription>
        <CardContent>
          <p>
            Street: {family.address.street}
          </p>
          <p>
            Unit: {family.address.unit}
          </p>
          <p>
            City: {family.address.city}
          </p>
          <p>
            State: {family.address.state}
          </p>
          <p>
            Zip: {family.address.zip}
          </p>
        </CardContent>
        <CardFooter>
          <UpdateAddressDialog family={family} />
        </CardFooter>
      </CardHeader>
    </Card>
  )
}


function StudentCard({ family }: { family: FamilyAppModel }) {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>
          Students in this family.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Thomasville Primary School: {family.students.tps}
        </p>
        <p>
          Liberty Drive School: {family.students.lds}
        </p>
        <p>
          Thomasville Middle School: {family.students.tms}
        </p>
        <p>
          Thomasville High School: {family.students.ths}
        </p>
      </CardContent>
      <CardFooter>
        <UpdateStudentsDialog family={family} />
      </CardFooter>
    </Card>
  )
}

function UpdateStudentsDialog({ family }: { family: FamilyAppModel }) {
  const fetcher = useFetcher<typeof action>();
  const [isOpen, setIsOpen] = useState(false);


  const isFetching = fetcher.state !== 'idle';
  const actionData = fetcher.data;

  const formResult = actionData?.result ?? { success: false, errors: {} };
  const formErrors = formResult.success ? {} : formResult.errors as Partial<Record<"tps" | "lds" | "tms" | "ths" | "_global", string[]>>;

  useEffect(() => {
    if (actionData?.result?.success) {
      setIsOpen(false);
    }
  }, [actionData, isFetching])

  const errors = {
    tps: formErrors.tps ? formErrors.tps[0] : "",
    lds: formErrors.lds ? formErrors.lds[0] : "",
    tms: formErrors.tms ? formErrors.tms[0] : "",
    ths: formErrors.ths ? formErrors.ths[0] : "",
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <fetcher.Form method="POST">
          <DialogHeader className="py-2">
            <DialogTitle>Update Address</DialogTitle>
            <DialogDescription>
              Update the address for this family.
            </DialogDescription>
          </DialogHeader>
          <input readOnly type="hidden" name="type" value={"students"} />
          <FormNumberField
            label="Primary School"
            id="tps"
            defaultValue={family.students.tps.toString()}
            error={errors.tps}
          />
          <FormNumberField
            label="Liberty Drive School"
            id="lds"
            defaultValue={family.students.lds.toString()}
            error={errors.lds}
          />
          <FormNumberField
            label="Middle School"
            id="tms"
            defaultValue={family.students.tms.toString()}
            error={errors.tms}
          />
          <FormNumberField
            label="High School"
            id="ths"
            defaultValue={family.students.ths.toString()}
            error={errors.ths}
          />
          <DialogFooter >
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}
function UpdateAddressDialog({ family }: { family: FamilyAppModel }) {
  const fetcher = useFetcher<typeof action>();
  const [isOpen, setIsOpen] = useState(false);


  const isFetching = fetcher.state !== 'idle';
  const actionData = fetcher.data;


  useEffect(() => {
    if (actionData?.result?.success) {
      setIsOpen(false);
    }
  }
    , [actionData, isFetching])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <fetcher.Form method="POST">
          <DialogHeader className="py-2">
            <DialogTitle>Update Address</DialogTitle>
            <DialogDescription>
              Update the address for this family.
            </DialogDescription>
          </DialogHeader>
          <input readOnly type="hidden" name="type" value={"address"} />
          <FormTextField
            label="Street"
            id="street"
            defaultValue={family.address.street}
          />
          <FormTextField
            label="Unit"
            id="unit"
            defaultValue={family.address.unit}
          />
          <FormTextField
            label="City"
            id="city"
            defaultValue={family.address.city}
          />
          <FormTextField
            label="State"
            id="state"
            defaultValue={family.address.state}
          />
          <FormTextField
            label="Zip"
            id="zip"
            defaultValue={family.address.zip}
          />

          <DialogFooter >
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}

export {
  SingleTextUpdate,
  AddressCard,
  StudentCard
}