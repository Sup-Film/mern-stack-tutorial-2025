import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../lib/axios";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteUpdateSkeleton from "../components/NoteUpdateSkeleton";
import { AlertTriangleIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isRateLimited, setRateLimited] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      setNote(null);

      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setRateLimited(false);
        setError(null);
      } catch (error) {
        console.log("Error in fetching note", error);
        const status = error.response?.status;

        if (status === 429) {
          setRateLimited(true);
          setError(null);
        } else {
          setRateLimited(false);
          if (status === 404) {
            setError("Note not found");
            toast.error("Note not found");
          } else {
            setError("Failed to fetch the note");
            toast.error("Failed to fetch the note");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
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
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating note:", error);
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 5000,
          icon: "⏳",
        });
      } else {
        toast.error("Failed to update note. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (isRateLimited) return <RateLimitedUI />;
  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="card bg-base-100 shadow-lg border border-error/20">
            <div className="card-body items-center text-center space-y-4">
              <AlertTriangleIcon className="size-10 text-error" />
              <h2 className="text-2xl font-semibold text-error">An error occurred</h2>
              <p className="text-base-content/70">{error}</p>
              <div className="card-actions justify-center mt-4">
                <Link to="/" className="btn btn-ghost">
                  <ArrowLeftIcon className="h-5 w-5" />
                  Back to Notes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (loading || !note) return <NoteUpdateSkeleton />;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;
