import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { checkListStatus } from "./data-fetchers";





export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const listId = params.listId ?? "listId";
  const { list } = await checkListStatus(listId);


  return json({});
};

