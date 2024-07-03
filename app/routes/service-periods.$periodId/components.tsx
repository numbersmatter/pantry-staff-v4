import { useLoaderData } from "@remix-run/react"
import { loader } from "./route"
import { StandardContainer } from "~/components/common/containers"
import { BriefcaseIcon, MapPinIcon } from "lucide-react"



function Header() {
  let { headerInfo } = useLoaderData<typeof loader>()
  return (
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
  )
}


function ServicePeriodNavMenu() {
  return (
    <div>
      <h1>Service Periods</h1>
    </div>
  )
}

function ServicePeriodDashboard() {
  let { stats } = useLoaderData<typeof loader>()
  return (
    <StandardContainer >
      <h3>Dashboard</h3>
      <DataCards stats={stats} />
    </StandardContainer>
  )
}

const stats: { name: string, stat: string }[] = [
  { name: 'Total Families', stat: '60' },
  { name: 'Services Delivered', stat: '73' },
  { name: 'Community Value', stat: '$4,567.00' },
]

function DataCards({ stats }: { stats: { name: string, stat: string }[] }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((item) => (
        <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
        </div>
      ))}
    </div>
  )
}



export { Header, ServicePeriodNavMenu, ServicePeriodDashboard }