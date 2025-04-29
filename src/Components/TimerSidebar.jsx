import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const TimerSidebar = ({ setSelectedTask, userId }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [focusTime, setFocusTime] = useState(""); // Set default value to 25
  const [shortBreak, setShortBreak] = useState(""); // Set default value to 5
  const [longBreak, setLongBreak] = useState(""); // Set default value to 15
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks for the specific user
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users", userId, "tasks"),
      (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskData);
      }
    );
    return () => unsub();
  }, [userId]);

  const clearInputs = () => {
    setTaskInput("");
    setFocusTime(""); // Reset to default value
    setShortBreak(""); // Reset to default value
    setLongBreak(""); // Reset to default value
    setEditingTaskId(null);
  };

  const addOrUpdateTask = async () => {
    if (!taskInput.trim()) return;

    const taskData = {
      name: taskInput.trim(),
      focusTime: focusTime || 25, // Default to 25 if not provided
      shortBreak: shortBreak || 5, // Default to 5 if not provided
      longBreak: longBreak || 15, // Default to 15 if not provided
    };

    try {
      if (editingTaskId) {
        const taskRef = doc(db, "users", userId, "tasks", editingTaskId);
        await updateDoc(taskRef, taskData);
      } else {
        await addDoc(collection(db, "users", userId, "tasks"), taskData);
      }
      clearInputs();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "users", userId, "tasks", id)); // Delete from Firestore
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Update local state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEdit = (task) => {
    setTaskInput(task.name);
    setFocusTime(task.focusTime); // Set focusTime from task data
    setShortBreak(task.shortBreak); // Set shortBreak from task data
    setLongBreak(task.longBreak); // Set longBreak from task data
    setEditingTaskId(task.id);
  };

  return (
    <div className="p-4 h-full w-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Pomodoro Tasks</h2>

      <div className="space-y-2 mb-4">
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Task name"
          className="w-full border px-3 py-1 rounded-md text-sm"
        />
        <input
          value={focusTime}
          onChange={(e) => setFocusTime(e.target.value)}
          placeholder="Focus time (minutes)"
          className="w-full border px-3 py-1 rounded-md text-sm"
        />
        <input
          value={shortBreak}
          onChange={(e) => setShortBreak(e.target.value)}
          placeholder="Short break (minutes)"
          className="w-full border px-3 py-1 rounded-md text-sm"
        />
        <input
          value={longBreak}
          onChange={(e) => setLongBreak(e.target.value)}
          placeholder="Long break (minutes)"
          className="w-full border px-3 py-1 rounded-md text-sm"
        />
        <button
          onClick={addOrUpdateTask}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border p-3 rounded bg-gray-50 shadow-sm flex justify-between items-start cursor-pointer"
            onClick={() => setSelectedTask(task)}
          >
            <div>
              <p className="font-semibold">{task.name}</p>
              <p className="text-xs text-gray-600">
                Focus: {task.focusTime} min
              </p>
              <p className="text-xs text-gray-600">
                Short Break: {task.shortBreak} min
              </p>
              <p className="text-xs text-gray-600">
                Long Break: {task.longBreak} min
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startEdit(task);
                }}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerSidebar;
