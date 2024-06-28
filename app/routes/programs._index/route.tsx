import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { StandardContainer } from "~/components/common/containers";
import { protectedRoute } from "~/lib/auth/auth.server";
import { ProgramsHeader, ProgramsList } from "./components";
import { getProgramsData } from "./data-fetchers";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const programsData = await getProgramsData();
  return json(programsData);
};

export default function ProgramsIndexLayout() {
  let { programsList, programs } = useLoaderData<typeof loader>();

  return (
    <StandardContainer>
      <ProgramsHeader />
      <ProgramsList programsList={programsList} />
      <pre>{JSON.stringify(programs, null, 2)}</pre>
    </StandardContainer>
  )
}
