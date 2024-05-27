import { getFirestore } from "firebase-admin/firestore";

interface StaffDoc {
  fname: string;
  lname: string;
}

function staffToDBModel(staff: StaffDoc) {
  const { fname, lname } = staff;
  return {
    fname,
    lname,
  };
}

const staffConverter = <T>() => ({
  toFirestore: (data: StaffDoc) => staffToDBModel(data),
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const staffDb = (path: string) => {
  const staff_collection = getFirestore()
    .collection(path)
    .withConverter(staffConverter<StaffDoc>());

  const read = async (staff_id: string) => {
    const doc = await staff_collection.doc(staff_id).get();
    return doc.data();
  };

  return {
    read,
  };
};

export { staffDb }; // const staff_collection = dataPoint<StaffDoc>(db_paths.staff);
