import HistoryEntry from "../models/HistoryEntry.js";

export const fetchAllHistoryEntries = async () => {
  try {
    const entries = await HistoryEntry.find();
    return entries;
  } catch (error) {
    throw new Error("Error fetching history entries: " + error.message);
  }
};

export const fetchHistoryEntryById = async (id) => {
  try {
    const entry = await HistoryEntry.findById(id);
    if (!entry) {
      throw new Error("History entry not found");
    }
    return entry;
  } catch (error) {
    throw new Error("Error fetching history entry by ID: " + error.message);
  }
};

export const fetchHistoryByTarget = async (targetId) => {
  try {
    const entries = await HistoryEntry.find({ targetId });
    return entries;
  } catch (error) {
    throw new Error("Error fetching history by target: " + error.message);
  }
};

export const addNewHistoryEntry = async (data) => {
  try {
    const entry = new HistoryEntry(data);
    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error creating history entry: " + error.message);
  }
};

export const modifyHistoryEntryById = async (id, data) => {
  try {
    let entry = await HistoryEntry.findById(id);

    if (!entry) {
      entry = new HistoryEntry({ _id: id, ...data });
    } else {
      Object.assign(entry, data);
    }

    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error modifying/creating history entry: " + error.message);
  }
};

export const modifyHistoryByTargetId = async (targetId, data) => {
  try {
    const entry = await HistoryEntry.findOne({ targetId });

    if (!entry) {
      throw new Error("Histórico não encontrado para o targetId.");
    }

    Object.assign(entry, data);
    await entry.save();

    return entry;
  } catch (error) {
    throw new Error(
      "Erro ao modificar histórico por targetId: " + error.message
    );
  }
};

export const removeHistoryEntryById = async (id) => {
  try {
    const entry = await HistoryEntry.findByIdAndDelete(id);
    if (!entry) {
      throw new Error("History entry not found");
    }
    return { message: "History entry deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting history entry: " + error.message);
  }
};
