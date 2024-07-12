import { SeatId } from "../seats/types/seats-model";
import {
  ServicePeriod,
  ServicePeriodDbModel,
  ServicePeriodId,
} from "../service-periods/types/service-periods-model";
import { ServiceTransactionType } from "../service-transactions/types/service-trans-model";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export type ServiceListId = string;

export type ListStatus = "preparing" | "applied" | "cancelled";
interface ServiceListBase {
  name: string;
  description: string;
  service_period_id: ServicePeriodId;
  service_period: ServicePeriodDbModel;
  seats_array: SeatId[];
  service_type: string;
  service_items: ItemLine[];
  status: ListStatus;
}

export interface ServiceList extends ServiceListBase {
  id: ServiceListId;
  created_date: Date;
  applied_date: Date;
}

export interface ServiceListDbModel extends ServiceListBase {
  created_date: Timestamp | FieldValue;
  applied_date: Timestamp | FieldValue;
}

export interface ServiceListOLDDbModel {
  id: ServiceListId;
  name: string;
  description: string;
  service_period_id: ServicePeriodId;
  service_period: ServicePeriod;
  seatsArray: SeatId[];
  serviceType: ServiceTransactionType;
  serviceItems: ItemLine[];
  status: ListStatus;
  created_date: Timestamp | FieldValue;
  applied_date: Timestamp | FieldValue;
}

export interface ServiceListAdd {
  name: string;
  description: string;
  service_period_id: ServicePeriodId;
  service_period: ServicePeriodDbModel;
  seats_array: SeatId[];
  service_type: string;
  service_items: ItemLine[];
}

export type ItemTypes =
  | "packed-box"
  | "pre-packed-box"
  | "individual-items"
  | "menu-box"
  | "other";
export type ValueEstimationType = "exact" | "approximate" | "other";
export type ValueEstimationProcess =
  | "Walmart"
  | "batch-estimate"
  | "other"
  | "org-assigned";

export interface ItemLine {
  item_name: string;
  type: ItemTypes;
  quantity: number;
  value: number;
  item_id: string;
  memo?: string;
}
