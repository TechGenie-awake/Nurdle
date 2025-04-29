import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { IoClose } from "react-icons/io5";

const Memo = ({ selectedMemo, setSelectedMemo, user }) => {
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedMemo) {
      setTitle(selectedMemo.title || "");
      setNoteContent(selectedMemo.content || "");
    } else {
      setTitle("");
      setNoteContent("");
    }
  }, [selectedMemo]);

  const handleSaveNote = async () => {
    if (!noteContent.trim()) {
      console.log("Note content is empty!");
      return;
    }

    setIsSaving(true);

    const noteData = {
      title: title.trim() || "Untitled Memo",
      content: noteContent.trim(),
      createdAt: selectedMemo ? selectedMemo.createdAt : serverTimestamp(),
      updatedAt: serverTimestamp(),
      userId: user.uid,
    };

    try {
      if (selectedMemo) {
        const memoRef = doc(db, "memos", selectedMemo.id);
        await updateDoc(memoRef, noteData);
      } else {
        await addDoc(collection(db, "memos"), noteData);
      }

      console.log("Memo saved:", noteData);
      setTitle("");
      setNoteContent("");
      setSelectedMemo(null);
    } catch (error) {
      console.error("Error saving memo:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setSelectedMemo(null);
    setTitle("");
    setNoteContent("");
  };

  return (
    <div className="bg-white/30 h-full w-full rounded-2xl shadow-lg p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <input
          className="text-2xl font-bold text-gray-800 bg-transparent border-none focus:outline-none w-full"
          placeholder="Memo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSaving}
        />
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <IoClose size={28} />
        </button>
      </div>

      <textarea
        className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
        rows="13"
        placeholder="Write your memo here..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        disabled={isSaving}
        style={{ fontFamily: "'Handwritten', sans-serif", fontSize: "1.5rem" }}
      />

      <div className="mt-3 flex justify-end">
        <button
          onClick={handleSaveNote}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed text-2xl"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : selectedMemo ? "Update Memo" : "Save Memo"}
        </button>
      </div>
    </div>
  );
};

export default Memo;
