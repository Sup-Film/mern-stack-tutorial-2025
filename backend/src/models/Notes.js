import mongoose from "mongoose";

// Create a schema
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // เพิ่ม timestamps (createdAt, updatedAt) ให้โดยอัตโนมัติ
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
