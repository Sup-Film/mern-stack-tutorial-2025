import express from "express";
import {
  listNotes,
  createNoteAsync,
  updateNoteAsync,
  deleteNoteAsync,
} from "../controller/asyncNotesController.js";

const router = express.Router();

router.get("/", listNotes);
router.post("/", createNoteAsync);
router.put("/:id", updateNoteAsync);
router.delete("/:id", deleteNoteAsync);

export default router;

