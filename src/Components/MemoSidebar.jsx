import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { MdLibraryAdd } from "react-icons/md";

const MemoSidebar = ({ setSelectedMemo, user }) => {
  const [memos, setMemos] = useState([]);
  const [memoTitle, setMemoTitle] = useState("");
  const [editingMemoId, setEditingMemoId] = useState(null);

  useEffect(() => {
    if (!user) return;

    const memosRef = collection(db, "memos");
    const userMemosQuery = query(memosRef, where("userId", "==", user.uid));

    const unsub = onSnapshot(userMemosQuery, (snapshot) => {
      const memoData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMemos(memoData);
    });

    return () => unsub();
  }, [user]);

  const clearInputs = () => {
    setMemoTitle("");
    setEditingMemoId(null);
  };

  const addOrUpdateMemo = async () => {
    if (!memoTitle.trim()) return;

    const memoData = {
      title: memoTitle.trim(),
      userId: user.uid,
      content: "",
      createdAt: new Date(),
    };

    try {
      if (editingMemoId) {
        const memoRef = doc(db, "memos", editingMemoId);
        await updateDoc(memoRef, { title: memoTitle.trim() });
      } else {
        const docRef = await addDoc(collection(db, "memos"), memoData);
        setMemos((prev) => [...prev, { id: docRef.id, ...memoData }]);
        setSelectedMemo({ id: docRef.id, ...memoData });
      }
      clearInputs();
    } catch (error) {
      console.error("Error saving memo:", error);
    }
  };

  const startEdit = (memo) => {
    setMemoTitle(memo.title);
    setEditingMemoId(memo.id);
    setSelectedMemo(memo);
  };

  const deleteMemo = async (id) => {
    try {
      await deleteDoc(doc(db, "memos", id));
      setMemos((prev) => prev.filter((memo) => memo.id !== id));
    } catch (error) {
      console.error("Error deleting memo:", error);
    }
  };

  return (
    <div className="p-4 h-full w-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Your Memos</h2>

      <div className="space-y-2 mb-4">
        <input
          value={memoTitle}
          onChange={(e) => setMemoTitle(e.target.value)}
          placeholder="Memo Title"
          className="w-full border px-3 py-1 rounded-md text-sm"
        />
        <button
          onClick={addOrUpdateMemo}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          {!editingMemoId && <MdLibraryAdd className="text-white" />}
          {editingMemoId ? "Update Title" : "New Memo"}
        </button>
      </div>

      <div className="space-y-4">
        {memos.map((memo) => (
          <div
            key={memo.id}
            className="border p-3 rounded bg-gray-50 shadow-sm flex justify-between items-start cursor-pointer"
            onClick={() => startEdit(memo)}
          >
            <div>
              <p className="font-semibold">{memo.title}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startEdit(memo);
                }}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMemo(memo.id);
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

export default MemoSidebar;
