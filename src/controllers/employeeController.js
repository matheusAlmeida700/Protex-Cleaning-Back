import {
  fetchAllEmployees,
  fetchEmployeeById,
  addNewEmployee,
  modifyEmployeeById,
  removeEmployeeById,
  addMultipleEmployees,
} from "../services/employeeService.js";
import { employeeSchema } from "../utils/validators.js";

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await fetchAllEmployees();
    res.json({ employees });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await fetchEmployeeById(id);
    res.json({ employee });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const errors = [];
      for (const item of data) {
        const { error } = employeeSchema.validate(item, { abortEarly: false });
        if (error) {
          errors.push(...error.details.map((err) => err.message));
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newEmployees = await addMultipleEmployees(data);
      return res.status(201).json({ newEmployees });
    } else {
      const { error } = employeeSchema.validate(data, { abortEarly: false });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((err) => err.message) });
      }

      const newEmployee = await addNewEmployee(data);
      return res.status(201).json({ newEmployee });
    }
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedEmployee = await modifyEmployeeById(id, updatedData);
    res.status(200).json({ updatedEmployee });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removeEmployeeById(id);
    res.status(200).json(message);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
