import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { StaffShell } from "~/components/shell/staff-shell";
import { protectedRoute } from "~/lib/auth/auth.server";

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
    <StaffShell
      navigation={[
        { name: 'Home', href: '/home', current: true },
        // { name: 'Reporting', href: '/reporting/', current: false },
        // { name: 'Weekplans', href: '/weekplans/', current: false },
      ]}
      appUser={{
        fname: "Leonard",
        lname: "Lawson",
        email: '',
        id: '1',
      }}
    >
      <h1>hello</h1>
      <pre>{JSON.stringify(data)}</pre>
    </StaffShell>
  );
}
