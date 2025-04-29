import { db } from "../firebase"; // Firebase configuration
import {
  doc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // Added getDocs

// Service to handle task data
export const createTask = async (userId, task) => {
  try {
    const taskRef = doc(collection(db, "users", userId, "tasks"));
    await setDoc(taskRef, task);
    return taskRef.id;
  } catch (error) {
    console.error("Error creating task: ", error);
  }
};

export const getTasks = async (userId) => {
  try {
    const tasksRef = collection(db, "users", userId, "tasks");
    const taskSnapshot = await getDocs(tasksRef); // Now using getDocs
    const tasks = taskSnapshot.docs.map((doc) => doc.data());
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
  }
};

export const updateTask = async (userId, taskId, updatedData) => {
  try {
    const taskRef = doc(db, "users", userId, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};

export const deleteTask = async (userId, taskId) => {
  try {
    const taskRef = doc(db, "users", userId, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};
