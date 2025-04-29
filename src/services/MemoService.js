import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Fetch memos for a specific user
export const getMemos = async (userId) => {
  try {
    const memosRef = collection(db, "memos");
    const q = query(memosRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching memos:", error);
    return [];
  }
};

// Add a new memo
export const addMemo = async (memoData) => {
  try {
    const docRef = await addDoc(collection(db, "memos"), memoData);
    return { id: docRef.id, ...memoData };
  } catch (error) {
    console.error("Error adding memo:", error);
    return null;
  }
};

// Update an existing memo
export const updateMemo = async (memoId, memoData) => {
  try {
    const memoRef = doc(db, "memos", memoId);
    await updateDoc(memoRef, memoData);
    return { id: memoId, ...memoData };
  } catch (error) {
    console.error("Error updating memo:", error);
    return null;
  }
};

// Delete a memo
export const deleteMemo = async (memoId) => {
  try {
    const memoRef = doc(db, "memos", memoId);
    await deleteDoc(memoRef);
    return memoId;
  } catch (error) {
    console.error("Error deleting memo:", error);
    return null;
  }
};
