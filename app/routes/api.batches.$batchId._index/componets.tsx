import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";

export function BatchCard({ batch }: { batch: { name: string, id: string } }) {
  return (

    <Card>
      <CardHeader>
        <CardTitle>
          {batch.name}
        </CardTitle>
        <CardDescription>
          Batch Id:{batch.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BatchStats stats={[
          { name: 'Total Seats', stat: 100 },
          { name: 'Seats Filled', stat: 50 },
          { name: 'Seats Available', stat: 50 },
        ]} />

      </CardContent>
    </Card>
  )
}

function BatchStats({ stats }: { stats: { name: string, stat: number }[] }) {
  return (
    <div className="bg-slate-400 py-2 px-2">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Batch Stats
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden  rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}