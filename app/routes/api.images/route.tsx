import type { ActionFunctionArgs, UploadHandler } from "@remix-run/node";
import { json, unstable_composeUploadHandlers, unstable_createMemoryUploadHandler } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";




export const action = async ({ request }: ActionFunctionArgs) => {
  await protectedRoute(request);

  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "img") {
        return undefined;
      }
      if (!data) {
        return undefined
      }

      const uploadedImage = await uploadImage({
        data,
        referenceId: formId,
      });
      return uploadedImage.secure_url;
    },
    unstable_createMemoryUploadHandler()
  );


  return null;
};




export async function actionOrg({ params, request }: ActionArgs) {
  await intializeSession(request);
  const formId = params.formId ?? "default";
  const formDataClone = await request.clone().formData();


  //  validate form exists
  const { formStatus, validForm } = await validateFormForImageUpload({
    requestFormId: formId,
  })
  if (!validForm) {
    return redirect(`/studio/`)
  }

  //  validate form is in progress


  // upload image
  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "img") {
        return undefined;
      }
      if (!data) {
        return undefined
      }

      const uploadedImage = await uploadImage({
        data,
        referenceId: formId,
      });
      return uploadedImage.secure_url;
    },
    unstable_createMemoryUploadHandler()
  );



  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const imgSrc = formData.get("img") as string;
  const imgDesc = formData.get("desc") as string;
  const imageName = formData.get("fileName") as string;
  const returnUrl = formData.get("returnUrl") as string;
  const storeId = formData.get("storeId") as string;
  const fieldId = formData.get("fieldId") as string;

  if (!imgSrc) {
    return json({ error: "something wrong" });
  }

  const imageId = randomId();

  //  add image to form
  const writeImage = await addImageToForm({
    requestFormId: formId,
    imageUrl: imgSrc,
    imageName: imageName,
    fieldId,
    imageId,
  })



  return redirect(`/studio/${storeId}/form/${formId}`);
}

export async function loader({ params, request }: LoaderArgs) {
  await intializeSession(request);


  return json({});
}



