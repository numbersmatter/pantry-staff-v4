import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunction } from "@remix-run/node";
import { PreviewCard } from "./components/preview-card";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPreviewData } from "./data-fetchers";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const listId = params.listId ?? "listId";

  const previewData = await getPreviewData(listId);


  return json({ previewData }, { status: 200 });
};


export const action: ActionFunction = async ({ request, params }) => {
  return json({}, { status: 200 });
};


export default function PreviewListActions() {

  return (
    <>
      <PreviewCard />
    </>
  )
}