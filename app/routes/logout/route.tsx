import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator, protectedRoute } from "~/lib/auth/auth.server";
import { inputFromForm } from "composable-functions";
import { Button } from "~/components/ui/button";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  return json({});
};


export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const formInput = await inputFromForm(request);

  await authenticator.logout(request, { redirectTo: "/login" });


  return null;
};




export default function LogoutRoute() {
  const data = useLoaderData()
  return (
    <div className=" px-3 py-2 prose">
      <h1>Logout</h1>
      <Form method="post">
        <Button variant={"destructive"} type="submit">Logout</Button>
      </Form>
    </div>
  );
}