import {
  collection,
  doc,
  setDoc,
  DocumentData,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { firestore } from "../../firebase-config";
import { FSTripRequest } from "trip";

const COLLECTION_NAME = "requests";

export const createRequest = async (user: FSTripRequest) => {
  await setDoc(doc(collection(firestore, COLLECTION_NAME)), user);
};

export const getRequestList = async (): Promise<FSTripRequest | null> => {
  const requestList = [] as FSTripRequest[];
  const q = query(
    collection(firestore, COLLECTION_NAME),
    where("status", "==", "WAITING")
  );

  const querySnap = await getDocs(q);

  if (querySnap.docs.length > 0) {
    querySnap.forEach((doc) => {
      requestList.push(doc.data());
    });
  }

  return requestList;
};
