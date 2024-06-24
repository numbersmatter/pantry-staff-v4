import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getFamilies } from "./data-fetchers";
import { DataTable } from "~/components/common/data-table";
import { FamilyIndexTable } from "./components";



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const families = await getFamilies();
  return json({ families });
};



export default function FamiliesIndex() {
  const data = useLoaderData<typeof loader>();

  const { families } = data;
  const familyData = families.map((family) => {
    return {
      id: family.id,
      family_name: family.name,
      first_name: family.first_name,
      last_name: family.last_name,
    }
  })

  const familiesSorted = familyData
    .sort((a, b) => a.last_name.localeCompare(b.last_name));

  return (
    <div>
      <h1>Families Index</h1>
      <DataTable data={familiesSorted} columns={FamilyIndexTable} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}