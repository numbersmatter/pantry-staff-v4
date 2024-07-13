import {
  DocumentData,
  FieldValue,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
  getFirestore,
} from "firebase-admin/firestore";

import {
  ItemLine,
  ItemTypes,
  ListStatus,
  ServiceList,
  ServiceListAdd,
  ServiceListDbModel,
  ServiceListId,
} from "./types";

// function toFirestore
const serviceListToDbModel = (serviceList: ServiceList): ServiceListDbModel => {
  const data = {
    ...serviceList,
    created_date: Timestamp.fromDate(serviceList.created_date),
    applied_date: Timestamp.fromDate(serviceList.applied_date),
  };

  return data;
};

// Firestore data converter
const serviceListConverter: FirestoreDataConverter<ServiceList> = {
  toFirestore(serviceList: ServiceList): DocumentData {
    return serviceListToDbModel(serviceList);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ServiceList {
    const data = snapshot.data();
    return {
      ...data,
      id: snapshot.id,
      created_date: data.created_date.toDate(),
      applied_date: data.applied_date.toDate(),
    } as ServiceList;
  },
};

let serviceListDB = (path: string) => {
  const serviceLists_collection = () =>
    getFirestore().collection(path).withConverter(serviceListConverter);

  const create = async (serviceList: ServiceListAdd) => {
    const data = {
      ...serviceList,
      id: "",
      created_date: new Date(),
      applied_date: new Date(),
      status: "preparing" as ListStatus,
    };
    const colRef = serviceLists_collection();
    const docRef = await colRef.add(data);
    return docRef.id;
  };

  const update = async (
    id: ServiceListId,
    serviceList: Partial<ServiceListDbModel>
  ) => {
    const data = {
      ...serviceList,
      id,
      updated_date: FieldValue.serverTimestamp(),
    };
    const docRef = serviceLists_collection().doc(id);
    await docRef.update(data);
  };

  const read = async (id: ServiceListId) => {
    const doc = await serviceLists_collection().doc(id).get();
    return doc.data();
  };

  const remove = async (id: ServiceListId) => {
    await serviceLists_collection().doc(id).delete();
  };

  const getAll = async () => {
    const snapshot = await serviceLists_collection().get();
    return snapshot.docs.map((doc) => doc.data());
  };

  interface ItemInputs {
    item_name: string;
    quantity: number;
    value: number;
    type: ItemTypes;
  }

  const addItem = async (id: ServiceListId, item: ItemInputs) => {
    const itemId = serviceLists_collection().doc().id;
    const addItem: ItemLine = {
      ...item,
      item_id: itemId,
    };
    const docRef = serviceLists_collection().doc(id);
    await docRef.update({
      service_items: FieldValue.arrayUnion(addItem),
    });
  };

  const removeItem = async (id: ServiceListId, item: ItemLine) => {
    const docRef = serviceLists_collection().doc(id);
    await docRef.update({
      service_items: FieldValue.arrayRemove(item),
    });
  };

  const updateServiceItem = async ({
    listId,
    newItem,
  }: {
    listId: ServiceListId;
    newItem: ItemLine;
  }) => {
    const docRef = serviceLists_collection().doc(listId);

    const serviceList = await docRef.get();
    if (!serviceList.exists) {
      return;
    }
    const data = serviceList.data() as ServiceList;

    const serviceItems = data.service_items.map((item) => {
      if (item.item_id === newItem.item_id) {
        return {
          ...item,
          ...newItem,
        };
      }
      return item;
    });

    await docRef.update({
      service_items: serviceItems,
    });
  };

  const addSeat = async (id: ServiceListId, seatIDs: string) => {
    const docRef = serviceLists_collection().doc(id);
    await docRef.update({
      seats_array: FieldValue.arrayUnion(seatIDs),
    });
  };

  const removeSeat = async (id: ServiceListId, seatId: string) => {
    const docRef = serviceLists_collection().doc(id);
    await docRef.update({
      seats_array: FieldValue.arrayRemove(seatId),
    });
  };

  const inPeriod = async (periodId: string) => {
    const colRef = serviceLists_collection();
    const query = colRef.where("service_period_id", "==", periodId);
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => doc.data());
  };

  return {
    create,
    read,
    update,
    remove,
    getAll,
    addItem,
    removeItem,
    addSeat,
    removeSeat,
    inPeriod,
    updateServiceItem,
  };
};

export { serviceListDB };
