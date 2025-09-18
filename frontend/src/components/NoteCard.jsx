import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";

import { formatDate } from "../lib/utils";
import api from "../lib/axios.js";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      // อัปเดตสถานะของโน้ตในหน้าหลัก โดยการ prev.filter คืนค่าอาเรย์ใหม่ที่ไม่มีโน้ตที่ถูกลบ โดย note._id ที่ไม่เท่ากับ id ที่ถูกลบ จะถูกเก็บไว้ในอาเรย์ใหม่
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error deleting note:", error);
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 5000,
          icon: "⏳",
        });
      } else {
        toast.error("Failed to delete note. Please try again.");
      }
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-300 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-sm text-error"
              onClick={(e) => handleDelete(e, note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
