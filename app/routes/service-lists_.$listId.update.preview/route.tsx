import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunction } from "@remix-run/node";
import { PreviewCard } from "./components/preview-card";
import { protectedRoute } from "~/lib/auth/auth.server";
import { getPreviewData } from "./data-fetchers";
import { inputFromForm, success } from "composable-functions";
import { applyServiceList } from "./mutations";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const listId = params.listId ?? "listId";

  const previewData = await getPreviewData(listId);
  const backLink = `/service-lists/${listId}/seats`;


  return json({ previewData, listId, backLink }, { status: 200 });
};


export const action: ActionFunction = async ({ request, params }) => {
  const { appUser } = await protectedRoute(request);
  const formInput = await inputFromForm(request);


  const staff = {
    staff_id: appUser.id,
    staff_name: `${appUser.fname} ${appUser.lname}`,
  }

  if (formInput.actionType === "updateServiceList") {
    return await applyServiceList({ staff, formInput });
  }
  return json({
    success: false,
    message: "Invalid action",
  });
};


export default function PreviewListActions() {

  return (
    <>
      <PreviewCard />
    </>
  )
}