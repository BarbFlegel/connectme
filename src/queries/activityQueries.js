import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function getAllActivities() {
  const q = query(collection(db, "activities"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getJoinedActivities(uid) {
  const q = query(
    collection(db, "activities"),
    where("participants", "array-contains", uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getCreatedActivities(uid) {
  const q = query(
    collection(db, "activities"),
    where("creatorId", "==", uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
