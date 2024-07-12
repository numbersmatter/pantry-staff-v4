import {
  Timestamp,
  FirestoreDataConverter,
  getFirestore,
  FieldValue,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import {
  ApplicationAdd,
  ApplicationAppModel,
  ApplicationDbModel,
} from "./types";

const AppModelToDbModel = (application: ApplicationAppModel) => {
  const { id, ...rest } = application;
  return {
    ...rest,
    created_date: Timestamp.fromDate(application.created_date),
  };
};

const applicationConverter = {
  toFirestore(application: ApplicationAppModel) {
    return AppModelToDbModel(application);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    const data = snapshot.data() as ApplicationDbModel;
    return {
      ...data,
      id: snapshot.id,
      created_date: data.created_date.toDate(),
    };
  },
};

const applicationsDb = (path: string) => {
  const applicationCollection = getFirestore()
    .collection(path)
    .withConverter(applicationConverter);

  const create = async (application: ApplicationAdd) => {
    const docRef = applicationCollection.doc();
    const data = {
      ...application,
      id: docRef.id,
      created_date: new Date(),
    };

    await docRef.set(data);
    return docRef.id;
  };

  const read = async (id: string) => {
    const docRef = await applicationCollection.doc(id).get();
    return docRef.data();
  };

  const update = async (
    id: string,
    application: Partial<ApplicationDbModel>
  ) => {
    await applicationCollection.doc(id).update(application);
  };

  const getAll = async () => {
    const snapshot = await applicationCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  };

  return {
    create,
    read,
    update,
    getAll,
  };
};

export { applicationsDb };
