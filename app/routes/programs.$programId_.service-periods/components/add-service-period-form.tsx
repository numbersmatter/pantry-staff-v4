
import { Form, useActionData } from '@remix-run/react'
import { DateInput } from '~/components/forms/date-input'
import { action } from '../route'
import { SerializableError } from 'composable-functions'

export default function AddPeriodForm() {
  const actionData = useActionData<typeof action>()

  const errors = actionData ? actionData.errors : []

  const nameErrors = errors.filter((error) => error.path.includes('name'))

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Form method="POST" className='px-3'>
        <input type="hidden" name="_action" value="createPeriod" readOnly />
        <div className="space-y-12 sm:space-y-16">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Service Period Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Basic information about the service period.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Example: Summer 2022"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {
                    nameErrors.length > 0 && (
                      <p className="mt-2 text-sm text-red-600" id="name-error">
                        {nameErrors[0].message}
                      </p>
                    )
                  }
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Description
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">

                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Service Period Capacity
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              The number of seats this program can support.
            </p>
            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Capacity
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="capacity"
                      name="capacity"
                      type="text"
                      placeholder="Example: 60"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Service Period Start Date
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Enter the date when the services start.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Start Date
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <DateInput inputId={"start_date"} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Service Period End Date
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Enter the date when all services end.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label htmlFor="end_date" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  End Date
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <DateInput inputId={"end_date"} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </Form>
      <pre>{JSON.stringify(actionData, null, 2)}</pre>
    </div>
  )
}
