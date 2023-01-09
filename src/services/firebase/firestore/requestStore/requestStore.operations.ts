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

export const getRequestedTripsByStatus = async (
  email: string | undefined,
  status: string
) => {
  const requestList = [] as FSTripRequest[];

  const q = query(
    collection(firestore, COLLECTION_NAME),
    where("status", "==", status),
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

export const updateTripStatus = async (status: string, tripId: string) => {
  const docRef = doc(firestore, COLLECTION_NAME, tripId);

  await updateDoc(docRef, {
    status,
  });
};

export const rejectTrip = async (tripId: string) => {
  const docRef = doc(firestore, COLLECTION_NAME, tripId);

  await updateDoc(docRef, {
    user: null,
    status: "WAITING",
  });
};
