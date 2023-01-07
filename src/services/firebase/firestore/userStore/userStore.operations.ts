import { DocumentData } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";

export type FSUser = {
  email: string;
  role: string;
} & DocumentData;

const COLLECTION_NAME = "users";

export const registerUser = async (user: FSUser) => {
  await firestore().collection(COLLECTION_NAME).doc(user.email).set(user);
};

export const getUser = async (email: string): Promise<FSUser | null> => {
  const docRef = firestore().collection(COLLECTION_NAME).doc(email);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return docSnap.data() as FSUser;
  } else {
    return null;
  }
};
