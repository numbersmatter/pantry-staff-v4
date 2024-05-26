import { Transition, Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from "@remix-run/react"
import { CheckIcon } from 'lucide-react'
import { Fragment, useState } from 'react'
import { cn } from '~/lib/utils'
// import { classNames } from "~/lib"

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export type Tab = {
  name: string
  to: string
  count: number
  current: boolean
}

const tabs = [
  { name: 'Monday', href: '#', count: '52', current: false },
  { name: 'Tuesday', href: '#', count: '6', current: false },
  { name: 'Wednesday', href: '#', count: '4', current: true },
  { name: 'Thursday', href: '#', current: false },
  { name: 'Friday', href: '#', current: false },
]


export function WeeklyTabs({
  tabs, children, handleTabChange
}: {
  tabs: Tab[], children?: React.ReactNode, handleTabChange: (tab: Tab) => void
}) {
  return (
    <div>
      {children}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabChange(tab)}
                className={cn(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                  'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={cn(
                      tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block'
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div >
  )
}


export function SelectTab({
  tabs, selected, handleTabChange
}: {
  tabs: Tab[],
  selected: Tab,
  handleTabChange: (tab: Tab) => void
}) {


  return (
    <div className="sm:hidden">
      <Listbox aria-label="weekday" value={selected} onChange={(tab) => handleTabChange(tab)}>
        <div className="relative mt-1 z-20">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-30 max-h-60 w-full overflow-auto bg-white rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {tabs.map((tab, tabIdx) => (
                <Listbox.Option
                  key={tabIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={tab}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {tab.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>

  )
}
