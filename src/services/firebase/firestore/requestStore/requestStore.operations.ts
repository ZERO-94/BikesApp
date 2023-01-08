import {
  collection,
  doc,
  addDoc,
  DocumentData,
  where,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase-config";
import { FSTripRequest } from "../../../../types/trip";
import { FSUser } from "../userStore/userStore.operations";

const COLLECTION_NAME = "requests";

export const createRequest = async (user: FSTripRequest) => {
  const docRef = await addDoc(collection(firestore, COLLECTION_NAME), user);

  await updateDoc(docRef, {
    id: docRef.id,
  });
};

export const getRequestList = async (): Promise<FSTripRequest[] | null> => {
  const requestList = [] as FSTripRequest[];
  const q = query(
    collection(firestore, COLLECTION_NAME),
    where("status", "==", "WAITING")
  );

  const querySnap = await getDocs(q);

  if (querySnap.docs.length > 0) {
    querySnap.forEach((doc) => requestList.push(doc.data() as FSTripRequest));
  }

  return requestList;
};

export const requestTrip = async (
  email: string | undefined,
  requestId: string
) => {
  const docRef = doc(firestore, COLLECTION_NAME, requestId);

  await updateDoc(docRef, {
    user: email,
    status: "REQUEST",
  });
};

export const getRequestedTrips = async (email: string | undefined) => {
  const requestList = [] as FSTripRequest[];

  const q = query(
    collection(firestore, COLLECTION_NAME),
    where("status", "==", "REQUEST"),
    where("biker", "==", email)
  );

  const querySnap = await getDocs(q);

  if (querySnap.docs.length > 0) {
    querySnap.forEach((doc) => {
      requestList.push(doc.data() as FSTripRequest);
    });
  }

  return requestList;
};
