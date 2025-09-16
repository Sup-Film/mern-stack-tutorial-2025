import Note from "../models/Notes.js";

// ในกรณีที่ไม่ได้ใช้ตัวแปร req ให้แทนที่ด้วย _ เพื่อบอกว่าไม่ได้ใช้
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching getAllNotes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const notes = await Note.findById(req.params.id);
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching getNoteById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title: title, content: content });

    const saveNote = await newNote.save();
    res.status(201).json({
      message: "Note created successfully",
      note: saveNote,
    });
  } catch (error) {
    console.error("Error creating note controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
      },
      { new: true } // ถ้าใช้ { new: true } จะคืนค่า document ที่อัปเดตแล้วกลับมา
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error updating note controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
