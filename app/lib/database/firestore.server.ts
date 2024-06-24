import { staffDb } from "./staff/staff-crud.server";
import { familyDb } from "./families/family-crud.server";
import { personDb } from "./person/person-crud.server";

const basePath = process.env.BASEPATH;

const db_paths = {
  staff: `${basePath}staff`,
  families: `${basePath}families`,
  persons: `${basePath}persons`,
};

export const db = {
  staff: staffDb(db_paths.staff),
  families: familyDb(db_paths.families),
  person: personDb(db_paths.persons),
};
