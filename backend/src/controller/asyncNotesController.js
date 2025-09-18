import Note from "../models/Notes.js";

// ตัวอย่างคอนโทรลเลอร์แบบ async/await ที่ไม่ต้องมี try/catch
// อาศัย express-async-errors ให้โยน error ออกไปยัง global error handler

export async function listNotes(req, res) {
  const notes = await Note.find().sort({ createdAt: -1 }); // เรียงจากใหม่ไปเก่า
  res.status(200).json(notes);
}

export async function createNoteAsync(req, res) {
  const { title, content } = req.body;
  if (!title || !content) {
    const err = new Error("title และ content จำเป็นต้องมี");
    err.status = 400;
    throw err;
  }
  const note = await Note.create({ title, content });
  res.status(201).json({ message: "สร้างโน้ตสำเร็จ", note });
}

export async function updateNoteAsync(req, res) {
  const { title, content } = req.body;
  const updated = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true, runValidators: true }
  );

  if (!updated) {
    const err = new Error("ไม่พบโน้ตที่ต้องการแก้ไข");
    err.status = 404;
    throw err;
  }

  res.status(200).json({ message: "อัปเดตโน้ตสำเร็จ", note: updated });
}

export async function deleteNoteAsync(req, res) {
  const deleted = await Note.findByIdAndDelete(req.params.id);
  if (!deleted) {
    const err = new Error("ไม่พบโน้ตที่ต้องการลบ");
    err.status = 404;
    throw err;
  }
  res.status(200).json({ message: "ลบโน้ตสำเร็จ" });
}

