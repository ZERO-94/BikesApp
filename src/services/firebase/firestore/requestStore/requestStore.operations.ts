import { DocumentData } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";

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
  await firestore().collection(COLLECTION_NAME).doc().set(request);
};

export const getUserCurrentRequest = async (
  email: string
): Promise<FSRequest | null> => {
  const querySnap = await firestore()
    .collection(COLLECTION_NAME)
    .where("createdBy", "==", email)
    .where("status", "==", "WAITING")
    .get();

  if (querySnap.docs.length > 0) {
    return (await querySnap.docs[0].data()) as FSRequest;
  } else {
    return null;
  }
};
