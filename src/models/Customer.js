import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    occupation: { type: String },
    companyName: { type: String },
    profilePicture: { type: String },
    industry: { type: String },
    complaintCount: { type: Number, default: 0 },
    serviceSLA: { type: Number, default: 0 },
    resolutionSLA: { type: Number, default: 0 },
    customerSatisfactionScore: { type: Number, default: 0 },
    serviceQuality: { type: Number, default: 0 },
    lastSupervision: { type: Date },
    certifiedProfessionals: { type: Boolean, default: false },
    checklistCompleted: { type: Boolean, default: false },
    teamChangeRequest: { type: Boolean, default: false },
    userId: { type: String },
    history: [
      {
        date: { type: Date, required: true },
        description: {
          type: String,
          required: true,
          minlength: 10,
          maxlength: 7000,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
