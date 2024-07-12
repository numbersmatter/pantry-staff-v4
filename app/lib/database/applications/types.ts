import { Timestamp } from "firebase-admin/firestore";
import { FamilyAdd, FamilyDbModel } from "../families/types";

export interface ApplicationDbModel {
  family: FamilyAdd;
  family_id: string;
  service_period_id: string;
  created_date: Timestamp;
}

export interface ApplicationAdd {
  family_id: string;
  service_period_id: string;
  family: FamilyAdd;
}

export interface ApplicationAppModel extends ApplicationAdd {
  created_date: Date;
  id: string;
}
