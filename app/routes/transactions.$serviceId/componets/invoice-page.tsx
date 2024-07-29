import { useLoaderData, Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { loader } from "../route"
import { Fragment } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import grocery from "~/components/images/gifs/grocery.gif"
import { classNames } from "~/lib/utils"
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from "@heroicons/react/24/outline"




function InvoiceItemsRows() {
  const { invoiceItems } = useLoaderData<typeof loader>()

  return (
    <>
      {
        invoiceItems.map((item) => (
          <tr key={item.item_id} className="border-b border-gray-100">
            <td className="max-w-0 px-0 py-5 align-top">
              <div className="truncate font-medium text-gray-900">
                {item.item_name}
              </div>
              <div className="truncate text-gray-500">
                {item.memo ?? item.item_name}
              </div>
            </td>
            <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
              {item.type}
            </td>
            <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
              {item.quantity}
            </td>
            <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.value}</td>
          </tr>
        ))
      }
    </>
  )
}

function InvoiceSummery() {
  const {
    familyName,
    family_id,
    dollarValue,
    service_completed_date,
    status,
  } = useLoaderData<typeof loader>()

  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              Value
            </dt>
            <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{dollarValue}</dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Status</dt>
            <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
              Received
            </dd>
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">Client</span>
              <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm font-medium leading-6 text-gray-900">
              {familyName}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Recieved</span>
              <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {service_completed_date}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Status</span>
              <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {status}
            </dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
          <Link to={`/families/${family_id}`} className="text-sm font-semibold leading-6 text-gray-900">
            Go to family <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>

  )
}

function ServiceTransactionHeader() {
  const { serviceId, service_period_id } = useLoaderData<typeof loader>()



  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex items-center justify-between gap-x-8 lg:mx-0">
        <div className="flex items-center gap-x-6">
          <img
            src={grocery}
            alt=""
            className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
          />
          <h1>
            <div className="text-sm leading-6 text-gray-500">
              Service Transaction ID:
              <span className="text-gray-700">
                {serviceId}
              </span>
            </div>
            <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
              Food Box Delivery
            </div>
          </h1>
        </div>
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          <Link to={`/service-periods/${service_period_id}/services`} type="button" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
            Back to Service Period
          </Link>
          <Link to="#" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
            Edit
          </Link>
          <Link
            to="#"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </Link>

          <Menu as="div" className="relative sm:hidden">
            <MenuButton className="-m-3 block p-3">
              <span className="sr-only">More</span>
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <button
                      type="button"
                      className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900'
                      )}
                    >
                      Copy URL
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                      )}
                    >
                      Edit
                    </Link>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export function InvoicePage() {
  const {
    familyName,
    address,
    service,
    family_id,
    createdOnDate,
  } = useLoaderData<typeof loader>()

  return (
    <>
      <ServiceTransactionHeader />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Invoice summary */}
          <InvoiceSummery />

          {/* Food Box Request */}
          <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
            <h2 className="text-base font-semibold leading-6 text-gray-900">
              Transaction
            </h2>
            <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
              <div className="sm:pr-4">
                <dt className="inline text-gray-500">
                  Created On {createdOnDate}
                </dt>{' '}
                <dd className="inline text-gray-700">
                  { }
                </dd>
              </div>
              <div className="mt-2 sm:mt-0 sm:pl-4">
                <dt className="inline text-gray-500"></dt>{' '}
                <dd className="inline text-gray-700">
                  <time dateTime="2023-31-01"></time>
                </dd>
              </div>
              <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                <dt className="font-semibold text-gray-900">From</dt>
                <dd className="mt-2 text-gray-500">
                  <span className="font-medium text-gray-900">
                    Food Delivery Program
                  </span>
                  <br />
                  Communities in Schools Thomasville
                  <br />

                </dd>
              </div>
              <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                <dt className="font-semibold text-gray-900">To</dt>
                <dd className="mt-2 text-gray-500">
                  <span className="font-medium text-gray-900">
                    {familyName}
                  </span>
                  <br />
                  {address.street}
                  <br />
                  {address.unit}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </dd>
              </div>
            </dl>
            <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
              <colgroup>
                <col className="w-full" />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="border-b border-gray-200 text-gray-900">
                <tr>
                  <th scope="col" className="px-0 py-3 font-semibold">
                    Service Items
                  </th>
                  <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                    Type
                  </th>
                  <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                    Quanity
                  </th>
                  <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <InvoiceItemsRows />

              </tbody>
            </table>
            <div className="mt-6 border-t border-gray-900/5 pt-6">
              <Button>
                Add Item
              </Button>
            </div>
          </div>

          <div className="lg:col-start-3">
            {/* Activity feed */}
            <h2 className="text-sm font-semibold leading-6 text-gray-900">Activity</h2>
          </div>
        </div>
      </div>
    </>
  )
}



