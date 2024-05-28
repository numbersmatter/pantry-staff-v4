import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { StaffShell } from "~/components/shell/staff-shell";
import { protectedRoute } from "~/lib/auth/auth.server";
import { StandardContainer } from "~/components/common/containers";
import SectionHeaderDescription from "~/components/shell/section-headers";
import { DataTable } from "~/components/common/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getBatches } from "./data-fetch.server";
import { batchesTableColumns } from "./components";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request)
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

  const batches = await getBatches();
  const header = {
    title: "Batches",
    description: "Batches are used to planned a group of service deliveries."
  }
  return json({ nav, appUser, batches, header });
};







export default function BatchesRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <StaffShell
      navigation={data.nav}
      appUser={data.appUser}
    >
      <StandardContainer >

        {/* Content goes here */}
        <SectionHeaderDescription
          header={data.header.title}
          description={data.header.description}
        />
        <DataTable
          columns={batchesTableColumns}
          data={data.batches}
        />
      </StandardContainer>
    </StaffShell>
  )
}