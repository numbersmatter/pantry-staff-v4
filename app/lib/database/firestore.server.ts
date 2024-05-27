import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { staffDb } from "./staff/staff-crud.server";

const dbPaths = {
  staff: "staff",
};

export const db = {
  staff: staffDb(dbPaths.staff),
};
