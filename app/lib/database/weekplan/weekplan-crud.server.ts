import {
  DocumentData,
  FirestoreDataConverter,
  WriteResult,
  getFirestore,
} from "firebase-admin/firestore";
import { WeekPlan, WeekPlanBase, WeekPlanDBModel } from "./types";

function weekplanToDbModel(weekplan: WeekPlan): WeekPlanDBModel {
  const { id, ...rest } = weekplan;
  return {
    ...rest,
  };
}

const weekplanConverter: FirestoreDataConverter<WeekPlan> = {
  toFirestore(weekplan: WeekPlan): WeekPlanDBModel {
    return weekplanToDbModel(weekplan);
  },
  fromFirestore(snapshot): WeekPlan {
    const data = snapshot.data() as WeekPlanDBModel;
    return {
      ...data,
      id: snapshot.id,
    };
  },
};

const weekPlanDb = (path: string) => {
  const weekplanCollection = () =>
    getFirestore().collection(path).withConverter(weekplanConverter);

  const readWeekPlan = async (id: string): Promise<WeekPlan | undefined> => {
    const doc = await weekplanCollection().doc(id).get();
    return doc.exists ? doc.data() : undefined;
  };

  const createWeekPlan = async (weekplan: WeekPlanBase): Promise<string> => {
    const colRef = weekplanCollection();
    const docRef = colRef.doc();
    const data = {
      ...weekplan,
      id: docRef.id,
    };
    await docRef.set(data);
    return docRef.id;
  };

  const updateWeekPlan = async ({
    weekplanId,
    data,
  }: {
    weekplanId: string;
    data: DocumentData;
  }): Promise<WriteResult> => {
    const colRef = weekplanCollection();
    const docRef = colRef.doc(weekplanId);
    const write = await docRef.update(data);

    return write;
  };

  const getAll = async (): Promise<WeekPlan[]> => {
    const snapshot = await weekplanCollection().get();
    return snapshot.docs.map((doc) => doc.data());
  };

  return {
    read: readWeekPlan,
    create: createWeekPlan,
    update: updateWeekPlan,
    getAll,
  };
};

export { weekPlanDb };
