import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../../firebase-config";

export type FSUser = {
  email: string;
  role: string;
} & DocumentData;

const COLLECTION_NAME = "users";

export const registerUser = async (user: FSUser) => {
  await setDoc(doc(collection(firestore, COLLECTION_NAME), user.email), user);
};

export const getUser = async (email: string): Promise<FSUser | null> => {
  const docRef = doc(firestore, COLLECTION_NAME, email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as FSUser;
  } else {
    return null;
  }
};
