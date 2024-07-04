import { useLoaderData } from '@remix-run/react';
import { loader } from '../route';
import { StandardContainer } from '~/components/common/containers';

export default function ProgramCard() {
  const { program } = useLoaderData<typeof loader>();
  return (
    <StandardContainer>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Program Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          ID: {program.id}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Program Name
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {program.name}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Program Area
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {program.program_area}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {program.criteria}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </StandardContainer>
  )
}
