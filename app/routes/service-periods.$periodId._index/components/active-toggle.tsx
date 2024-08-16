import { useState } from 'react'
import { Description, Field, Label, Switch } from '@headlessui/react'
import { useFetcher } from '@remix-run/react'

export default function ActiveToggle() {
  const [enabled, setEnabled] = useState(false)
  const fetcher = useFetcher();

  return (
    <div className="flex px-4 items-center justify-between">
      <Field className="flex items-center justify-between">
        <span className="flex flex-grow flex-col">
          <Label as="span" passive className="text-sm font-medium leading-6 text-gray-900">
            Allow Applications
          </Label>
          <Description as="span" className="text-sm text-gray-500">
            Active service periods allow applications to be submitted.
          </Description>
        </span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
          />
        </Switch>
      </Field>
    </div>
  )
}