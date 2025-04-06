import Employee from "../models/Employee.js";

export const fetchAllEmployees = async () => {
  try {
    const data = await Employee.find();
    return data;
  } catch (error) {
    throw new Error("Error fetching employees: " + error.message);
  }
};

export const fetchEmployeeById = async (id) => {
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  } catch (error) {
    throw new Error("Error fetching employee by ID: " + error.message);
  }
};

export const addNewEmployee = async (data) => {
  try {
    const employee = new Employee(data);
    await employee.save();
    return employee;
  } catch (error) {
    throw new Error("Error creating employee: " + error.message);
  }
};

export const modifyEmployeeById = async (id, data) => {
  try {
    const employee = await Employee.findByIdAndUpdate(id, data, { new: true });
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  } catch (error) {
    throw new Error("Error updating employee: " + error.message);
  }
};

export const removeEmployeeById = async (id) => {
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return { message: "Employee deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting employee: " + error.message);
  }
};
