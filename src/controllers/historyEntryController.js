import {
  fetchAllHistoryEntries,
  fetchHistoryEntryById,
  fetchHistoryByTarget,
  addNewHistoryEntry,
  modifyHistoryEntryById,
  removeHistoryEntryById,
} from "../services/historyEntryService.js";

import { historyEntrySchema } from "../utils/validators.js";

export const getAllHistoryEntries = async (req, res, next) => {
  try {
    const entries = await fetchAllHistoryEntries();
    res.json({ entries });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getHistoryEntryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = await fetchHistoryEntryById(id);
    res.json({ entry });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getHistoryByTarget = async (req, res, next) => {
  try {
    const { type, targetId } = req.params;
    const entries = await fetchHistoryByTarget(type, targetId);
    res.json({ entries });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
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
    const updatedData = req.body;
    const updatedEntry = await modifyHistoryEntryById(id, updatedData);

    if (updatedEntry.createdAt === updatedEntry.updatedAt) {
      return res.status(201).json({ updatedEntry });
    }

    res.status(200).json({ updatedEntry });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteHistoryEntryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removeHistoryEntryById(id);
    res.status(200).json(message);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
