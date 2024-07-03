import {
  DocumentData,
  FieldValue,
  QueryDocumentSnapshot,
  getFirestore,
} from "firebase-admin/firestore";
import { ItemLine } from "./types";

interface PendingActionDbModel {
  service_list_id: string;
  service_period_id: string;
  actionId: string;
  seats_array: string[];
  line_items: ItemLine[];
}

const converter = () => ({
  toFirestore: (data: PendingActionDbModel) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    snap.data() as PendingActionDbModel,
});

let pendingActionsDb = (path: string) => {
  const pendingCollection = () => {
    return getFirestore().collection(path).withConverter(converter());
  };

  const create = async (data: PendingActionDbModel) => {
    const colRef = pendingCollection();
    const docRef = await colRef.add(data);

    return docRef.id;
  };

  const read = async (pendingId: string) => {
    const colRef = pendingCollection();
    const docRef = await colRef.doc(pendingId).get();

    if (!docRef.data()) {
      return null;
    }

    const data = {
      ...docRef.data(),
      id: docRef.id,
    };

    return data;
  };

  const update = async (pendingId: string, data: DocumentData) => {
    const colRef = pendingCollection();
    await colRef.doc(pendingId).update(data);
  };

  const removeSeat = async (pendingId: string, seatId: string) => {
    const updateData = {
      seats_array: FieldValue.arrayRemove(seatId),
    };

    await update(pendingId, updateData);
  };

  const addSeat = async (pendingId: string, seatId: string) => {
    const updateData = {
      seats_array: FieldValue.arrayUnion(seatId),
    };

    await update(pendingId, updateData);
  };

  return {
    addSeat,
    removeSeat,
    read,
    create,
    addLineItem: () => {},
    removeLineItem: () => {},
  };
};

export { pendingActionsDb };
