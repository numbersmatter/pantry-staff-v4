import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { UIShell } from "~/components/shell/ui-shell";

export const meta: MetaFunction = () => {
  return [
    { title: "Food Pantry App" },
    { name: "description", content: "Welcome to Food Pantry App!" },
  ];
};



export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userData = await protectedRoute(request);
  return json({ userData });
};




export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <UIShell
      appUser={data.userData.appUser}
    >
      <h1>hello</h1>
      <pre>{JSON.stringify(data)}</pre>
    </UIShell>
  );
}
