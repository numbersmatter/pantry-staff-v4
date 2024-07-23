import {
  DocumentData,
  FirestoreDataConverter,
  Timestamp,
  QueryDocumentSnapshot,
  getFirestore,
} from "firebase-admin/firestore";
import { PersonAdd, PersonAppModel, PersonDbModel } from "./types";

const personToDbModel = (person: PersonAppModel): PersonDbModel => {
  const { id, ...rest } = person;
  return {
    ...rest,
    created_date: Timestamp.fromDate(person.created_date),
    updated_date: Timestamp.fromDate(person.updated_date),
  };
};

const personConverter: FirestoreDataConverter<PersonAppModel> = {
  toFirestore(person: PersonAppModel): DocumentData {
    return personToDbModel(person);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): PersonAppModel {
    const data = snapshot.data() as PersonDbModel;
    return {
      ...data,
      id: snapshot.id,
      created_date: data.created_date.toDate(),
      updated_date: data.updated_date.toDate(),
    };
  },
};

const personDb = (path: string) => {
  const personCollection = () =>
    getFirestore().collection(path).withConverter(personConverter);

  const create = async (person: PersonAdd): Promise<string> => {
    const data = {
      ...person,
      id: "",
      created_date: new Date(),
      updated_date: new Date(),
    };
    const personCollRef = personCollection();
    const docRef = await personCollRef.add(data);
    return docRef.id;
  };

  const read = async (id: string) => {
    const personCollRef = personCollection();
    const docRef = await personCollRef.doc(id).get();
    return docRef.data();
  };

  const update = async (id: string, person: Partial<PersonDbModel>) => {
    const personCollRef = personCollection();
    await personCollRef.doc(id).update(person);
  };

  const remove = async (id: string) => {
    const personCollRef = personCollection();
    await personCollRef.doc(id).delete();
  };

  const getList = async (list: string[]): Promise<PersonAppModel[]> => {
    const personCollRef = personCollection();
    const firestore = getFirestore();

    if (list.length === 0) {
      return [];
    }

    const personList = await firestore.getAll(
      ...list.map((id) => personCollRef.doc(id))
    );
    return personList.map((snapshot) => snapshot.data()) as PersonAppModel[];
  };

  return {
    create,
    read,
    update,
    remove,
    getList,
  };
};

export { personDb };
