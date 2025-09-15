import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    occupation: { type: String },
    companyName: { type: String },
    profilePicture: { type: String },
    industry: { type: String },
    proactiveRestroomMonitoring: { type: Boolean, default: false },
    certifiedContract: { type: Boolean, default: false },
    sanitizationStatus: {
      type: String,
      enum: ["done", "not done"],
      default: "not done",
    },
    generalCustomerSatisfaction: { type: Number, min: 1, max: 10, default: 0 },
    complaintsCount: { type: Number, default: 0 },
    lastSupervision: { type: Date },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
