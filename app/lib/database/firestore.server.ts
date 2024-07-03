import { staffDb } from "./staff/staff-crud.server";
import { familyDb } from "./families/family-crud.server";
import { personDb } from "./person/person-crud.server";
import { programsDb } from "./programs/programs-crud.server";
import { programAreaDb } from "./program-area/program-area-crud.server";
import { service_periodsDb } from "./service-periods/service-periods-crud.server";
import { service_transationsDb } from "./service-transactions/service-transactions-crud.server";
import { seatsDb } from "./seats/seats-crud.server";

const basePath = process.env.BASEPATH;

const db_paths = {
  staff: `${basePath}staff`,
  families: `${basePath}families`,
  persons: `${basePath}persons`,
  programs: `${basePath}programs`,
  program_areas: `${basePath}program_areas`,
  service_periods: `${basePath}service_periods`,
  service_transations: `${basePath}service_transations`,
  seats: `${basePath}seats`,
};

export const db = {
  staff: staffDb(db_paths.staff),
  families: familyDb(db_paths.families),
  person: personDb(db_paths.persons),
  programs: programsDb(db_paths.programs),
  program_areas: programAreaDb(db_paths.program_areas),
  service_periods: service_periodsDb(db_paths.service_periods),
  service_transactions: service_transationsDb(db_paths.service_transations),
  seats: seatsDb(db_paths.seats),
};
