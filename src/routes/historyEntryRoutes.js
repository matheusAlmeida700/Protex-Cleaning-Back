import express from "express";
import {
  getAllHistoryEntries,
  getHistoryEntryById,
  getHistoryByTarget,
  createHistoryEntry,
  updateHistoryEntryById,
  deleteHistoryEntryById,
} from "../controllers/historyEntryController.js";

const router = express.Router();

router.get("/", getAllHistoryEntries);
router.get("/:id", getHistoryEntryById);
router.get("/target/:targetId", getHistoryByTarget);
router.post("/", createHistoryEntry);
router.put("/:id", updateHistoryEntryById);
router.delete("/:id", deleteHistoryEntryById);

export default router;
