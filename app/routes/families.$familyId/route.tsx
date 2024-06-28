import {
  json,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react"
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";
import { AddressCard, SingleTextUpdate, StudentCard } from "./components";
import { inputFromForm, } from "composable-functions";
import { checkFamilyExists } from "./data-fetchers";
import {
  updateAddress,
  updateFamilyName,
  updateStudents,
} from "./mutations";
import { ContainerPadded, StandardContainer } from "~/components/common/containers";





export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await protectedRoute(request);
  const family = await checkFamilyExists(params.familyId ?? "familyId");

  return json({ family });
};




export const action = async ({ request, params }: ActionFunctionArgs) => {
  await protectedRoute(request);
  const familyId = params["familyId"] ?? "familyId";
  await checkFamilyExists(familyId)
  const formInput = await inputFromForm(request);

  const formAction = formInput["type"] as string;

  if (formAction === "updateFamilyName") {
    return await updateFamilyName(familyId, formInput);
  }

  if (formAction === "updateAddress") {
    return await updateAddress(familyId, formInput);
  }

  if (formAction === "updateStudents") {
    return await updateStudents(familyId, formInput);
  }



  return json({
    success: false,
    errorObject: {
      requestAction: "Invalid Request Action"
    },
    type: "invalidRequestAction"
  });
};





export default function Route() {
  const { family } = useLoaderData<typeof loader>();

  const familyData = {
    ...family,
    created_date: new Date(family.created_date)
  }

  return (
    <StandardContainer>
      <div className="py-3 px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Family Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Family Details.
        </p>
      </div>
      <div>

      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <SingleTextUpdate
            fieldId={"family_name"}
            fieldLabel={"Family Name"}
            fieldValue={familyData.family_name}
          />
          <AddressCard family={familyData} />
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Total Students
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {family.students.tps + family.students.lds + family.students.tms + family.students.ths}
              </span>
            </dd>
          </div>
          <div>
            <StudentCard family={familyData} />
          </div>
        </dl>
      </div>
    </StandardContainer>
  )
}


export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
