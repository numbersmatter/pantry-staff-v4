import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPrograms } from "./data-fetch.server";
import { programsTableColumns } from "./components";
import { DataTable } from "~/components/common/data-table";
import { StaffShell } from "~/components/shell/staff-shell";
import { StandardContainer } from "~/components/common/containers";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request)

  const programs = await getPrograms();
  const nav = [
    { name: 'Home', href: '/home', current: false },
    { name: 'Programs', href: '/programs', current: true },
  ]

  const appUser = {
    fname: "Leonard",
    lname: "Lawson",
    email: 'leonard@verticalhydration.com',
    id: '1',
  }

  return json({ programs, nav, appUser });
};


export default function ProgramsRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <StaffShell
      navigation={data.nav}
      appUser={data.appUser}
    >
      <StandardContainer >

        {/* Content goes here */}
        <SectionHeaderDescription
          header="Programs"
          description="Programs are the services that your organization provides to the community. Each program has a set of criteria that must be met in order to qualify for the program."
        />
        <DataTable
          columns={programsTableColumns}
          data={data.programs}
        />
      </StandardContainer>
    </StaffShell>
  )
}


function ProgramsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Programs</h1>
    </div>
  )
}

export function SectionHeaderDescription({
  header, description
}: {
  header: string,
  description: string
}) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h1 className="text-4xl font-semibold leading-6 text-gray-900">
        {header}
      </h1>
      <p className="mt-3 max-w-4xl text-base text-gray-500">
        {description}
      </p>
    </div>
  )
}