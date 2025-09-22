import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createNote)
  .get(protect, getNotes);

router.route("/:id")
  .put(protect, updateNote)
  .delete(protect, deleteNote);

export default router;
