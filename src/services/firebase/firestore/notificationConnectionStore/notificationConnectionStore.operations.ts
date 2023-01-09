import {
  collection,
  getDoc,
  doc,
  setDoc,
  DocumentData,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebase-config";

export type FSConnection = {
  token: string;
  owner: string;
  updatedAt: string;
} & DocumentData;

const COLLECTION_NAME = "notificationConnections";

export const createNotificationConnection = async (
  connection: FSConnection
) => {
  await setDoc(
    doc(collection(firestore, COLLECTION_NAME), connection.owner),
    connection
  );
};

export const getNotificationConnectionByEmail = async (email: string) => {
  const docRef = doc(firestore, COLLECTION_NAME, email.toLowerCase());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as FSConnection;
  } else {
    return null;
  }
};
