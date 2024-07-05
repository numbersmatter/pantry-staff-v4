import { useLoaderData } from "@remix-run/react"
import { StandardContainer } from "~/components/common/containers"
import { BriefcaseIcon, MapPinIcon } from "lucide-react"
import { loader } from "./route"



function Header() {
  let { headerInfo } = useLoaderData<typeof loader>()
  return (
    <StandardContainer>
      <div className="py-4 lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {headerInfo.title}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              text2
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              text3
            </div>
          </div>
        </div>
      </div>
    </StandardContainer>
  )
}

export { Header }