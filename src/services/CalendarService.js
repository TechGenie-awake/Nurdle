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

// Function to fetch calendar tasks for a specific user
export const getCalendarTasks = async (userId) => {
  const q = query(
    collection(db, "calendarTasks"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const date = data.dueDate.toDate(); // Firestore Timestamp to JS Date

    return {
      id: doc.id,
      title: data.title,
      start: date,
      end: new Date(date.getTime() + 60 * 60 * 1000), // Default 1 hour slot
      completed: data.completed,
    };
  });
};

// Function to add a new calendar task
export const addCalendarTask = async (task, userId) => {
  await addDoc(collection(db, "calendarTasks"), {
    title: task.title,
    dueDate: new Date(task.dueDate),
    userId,
    completed: false,
  });
};

// Function to delete a calendar task
export const deleteCalendarTask = async (taskId) => {
  await deleteDoc(doc(db, "calendarTasks", taskId));
};

// Function to toggle the completion status of a task
export const toggleCalendarTask = async (taskId, completed) => {
  await updateDoc(doc(db, "calendarTasks", taskId), { completed });
};
