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

export type FSRequest = {
  createdBy: string;
  fromLocation: string;
  toLocation: string;
  createdAt: string;
  status: string;
  bookingTime: string;
  biker: string | null;
} & DocumentData;

const COLLECTION_NAME = "requests";

export const createRequest = async (request: FSRequest) => {
  await setDoc(doc(collection(firestore, COLLECTION_NAME)), request);
};

export const getUserCurrentRequest = async (
  email: string
): Promise<FSRequest | null> => {
  const q = query(
    collection(firestore, COLLECTION_NAME),
    where("createdBy", "==", email),
    where("status", "==", "WAITING")
  );

  const querySnap = await getDocs(q);

  if (querySnap.docs.length > 0) {
    return (await querySnap.docs[0].data()) as FSRequest;
  } else {
    return null;
  }
};
