import {
  fetchAllEmployees,
  fetchEmployeeById,
  addNewEmployee,
  modifyEmployeeById,
  removeEmployeeById,
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
    const { error } = employeeSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }
    const newEmployee = await addNewEmployee(req.body);
    res.status(201).json({ newEmployee });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
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
