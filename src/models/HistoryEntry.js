import mongoose from "mongoose";

const HistoryEntrySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 7000,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HistoryEntry", HistoryEntrySchema);
