import {
  fetchAllHistoryEntries,
  fetchHistoryEntryById,
  fetchHistoryByTarget,
  addNewHistoryEntry,
  modifyHistoryEntryById,
  removeHistoryEntryById,
  modifyHistoryByTargetId,
} from "../services/historyEntryService.js";
import { historyEntrySchema } from "../utils/validators.js";

export const getAllHistoryEntries = async (req, res, next) => {
  try {
    const entries = await fetchAllHistoryEntries();
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

export const getHistoryEntryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = await fetchHistoryEntryById(id);
    res.json({ entry });
  } catch (error) {
    next(error);
  }
};

export const getHistoryByTarget = async (req, res, next) => {
  try {
    const { targetId } = req.params;
    const entries = await fetchHistoryByTarget(targetId);
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

export const createHistoryEntry = async (req, res, next) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const errors = [];
      for (const item of data) {
        const { error } = historyEntrySchema.validate(item, {
          abortEarly: false,
        });
        if (error) {
          errors.push(...error.details.map((err) => err.message));
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const created = await Promise.all(data.map(addNewHistoryEntry));
      return res.status(201).json({ created });
    } else {
      const { error } = historyEntrySchema.validate(data, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((err) => err.message) });
      }

      const newEntry = await addNewHistoryEntry(data);
      return res.status(201).json({ newEntry });
    }
  } catch (error) {
    next(error);
  }
};

export const updateHistoryEntryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEntry = await modifyHistoryEntryById(id, req.body);
    const status =
      updatedEntry.createdAt === updatedEntry.updatedAt ? 201 : 200;
    res.status(status).json({ updatedEntry });
  } catch (error) {
    next(error);
  }
};

export const updateHistoryByTargetId = async (req, res, next) => {
  try {
    const { targetId } = req.params;
    const updatedEntry = await modifyHistoryByTargetId(targetId, req.body);
    res.status(200).json({ updatedEntry });
  } catch (error) {
    next(error);
  }
};

export const deleteHistoryEntryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removeHistoryEntryById(id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
