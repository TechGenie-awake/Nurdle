import { useState, useEffect } from "react";
import {
  addCalendarTask,
  deleteCalendarTask,
  toggleCalendarTask,
  getCalendarTasks,
} from "../services/CalendarService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function CalendarSidebar() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", dueDate: "" });
  const [user] = useAuthState(auth);

  const refreshTasks = async () => {
    if (!user) return;
    const data = await getCalendarTasks(user.uid);
    setTasks(data);
  };

  useEffect(() => {
    refreshTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleAdd = async () => {
    if (!newTask.title || !newTask.dueDate) return;
    await addCalendarTask(newTask, user.uid);
    setNewTask({ title: "", dueDate: "" });
    refreshTasks();
  };

  return (
    <div className="p-4 bg-white shadow w-full max-w-xs h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Calendar Tasks</h2>
      <input
        className="border mb-2 w-full px-2 py-1"
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        className="border mb-2 w-full px-2 py-1"
        type="datetime-local"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-1 mb-4 w-full"
      >
        Add Task
      </button>

      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between mb-2">
          <div className={task.completed ? "line-through text-gray-500" : ""}>
            {task.title}
          </div>
          <div>
            <button
              onClick={() => toggleCalendarTask(task.id, !task.completed)}
              className="text-green-500 mr-2"
            >
              ✓
            </button>
            <button
              onClick={() => deleteCalendarTask(task.id)}
              className="text-red-500"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
