import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" is required`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `"email" is required`,
    "string.email": `"email" must be a valid email`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": `"password" is required`,
    "string.min": `"password" should have a minimum length of {#limit}`,
  }),
  role: Joi.string().valid("user", "admin").optional(),
});

export const customerSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  companyName: Joi.string().required(),
  profilePicture: Joi.string().uri().required(),
  industry: Joi.string().required(),
  complaintCount: Joi.number().min(0).required(),
  serviceSLA: Joi.number().min(0).required(),
  resolutionSLA: Joi.number().min(0).required(),
  customerSatisfactionScore: Joi.number().min(1).max(10).required(),
  serviceQuality: Joi.number().min(0).max(10).required(),
  lastSupervision: Joi.date().required(),
  certifiedProfessionals: Joi.boolean().required(),
  checklistCompleted: Joi.boolean().required(),
  teamChangeRequest: Joi.boolean().required(),
  userId: Joi.string().optional(),
  history: Joi.array()
    .items(
      Joi.object({
        date: Joi.date().required(),
        description: Joi.string().min(10).max(7000).required(),
      })
    )
    .default([]),
});

export const employeeSchema = Joi.object({
  name: Joi.string().required(),
  energyLevel: Joi.number().min(0).max(10).required(),
  committedEmployee: Joi.boolean().required(),
  complianceValuesAndConduct: Joi.boolean(),
  customerSatisfactionScore: Joi.number().min(1).max(10),
  complaints: Joi.number().min(0),
  serviceQuality: Joi.number().min(0).max(10),
  processCompliance: Joi.boolean(),
  employeeLevel: Joi.string().valid("Bronze", "Silver", "Gold", "Platinum"),
  growthGoals: Joi.array().items(Joi.string()),
  profilePicture: Joi.string().uri(),
  position: Joi.string(),
  teamName: Joi.string(),
  entryDate: Joi.date(),
  history: Joi.array()
    .items(
      Joi.object({
        date: Joi.date().required(),
        description: Joi.string().min(10).max(7000).required(),
      })
    )
    .default([]),
});
