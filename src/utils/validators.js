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
  role: Joi.string()
    .valid("customer", "employee", "admin")
    .required()
    .messages({
      "string.empty": `"role" is required`,
    }),
});

export const customerSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  companyName: Joi.string().required(),
  profilePicture: Joi.string().uri().optional(),
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
  userId: Joi.string().required(),
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
  userId: Joi.string().required(),
});

export const historyEntrySchema = Joi.object({
  targetId: Joi.string().required(),
  description: Joi.string().min(5).max(7000).required(),
});
