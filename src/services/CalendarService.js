import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const getCalendarTasks = async (userId) => {
  const q = query(
    collection(db, "calendarTasks"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      start: data.start.toDate(), // Firebase Timestamp to JS Date
      end: data.end.toDate(),
      completed: data.completed,
    };
  });
};

export const addCalendarTask = async (task, userId) => {
  await addDoc(collection(db, "calendarTasks"), {
    title: task.title,
    start: new Date(task.start),
    end: new Date(task.end),
    userId,
    completed: false,
  });
};

export const deleteCalendarTask = async (taskId) => {
  await deleteDoc(doc(db, "calendarTasks", taskId));
};

export const toggleCalendarTask = async (taskId, completed) => {
  await updateDoc(doc(db, "calendarTasks", taskId), { completed });
};
