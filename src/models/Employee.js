import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    energyLevel: { type: Number, default: 0 },
    committedEmployee: { type: Boolean, default: false },
    complianceValuesAndConduct: { type: Boolean, default: false },
    customerSatisfactionScore: { type: Number, default: 0 },
    complaints: { type: Number, default: 0 },
    serviceQuality: { type: Number, default: 0 },
    processCompliance: { type: Boolean, default: false },
    employeeLevel: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum"],
      default: "Bronze",
    },
    growthGoals: [{ type: String }],
    profilePicture: { type: String },
    position: { type: String },
    teamName: { type: String },
    entryDate: { type: Date },
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

export default mongoose.model("Employee", EmployeeSchema);
