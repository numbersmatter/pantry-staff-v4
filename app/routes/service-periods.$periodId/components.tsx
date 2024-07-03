import { useLoaderData } from "@remix-run/react"
import { loader } from "./route"



function Header() {
  return (
    <div>
      <h1>Service Periods</h1>
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
    <div className="prose">
      <h3>Dashboard</h3>
      <DataCards stats={stats} />
    </div>
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