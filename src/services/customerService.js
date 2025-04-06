import Customer from "../models/Customer.js";

export const fetchAllCustomers = async () => {
  try {
    const data = await Customer.find();
    return data;
  } catch (error) {
    throw new Error("Error fetching customers: " + error.message);
  }
};

export const fetchCustomerById = async (id) => {
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  } catch (error) {
    throw new Error("Error fetching customer by ID: " + error.message);
  }
};

export const addNewCustomer = async (data) => {
  try {
    const customer = new Customer(data);
    await customer.save();
    return customer;
  } catch (error) {
    throw new Error("Error creating customer: " + error.message);
  }
};

export const modifyCustomerById = async (id, data) => {
  try {
    const customer = await Customer.findByIdAndUpdate(id, data, { new: true });
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  } catch (error) {
    throw new Error("Error updating customer: " + error.message);
  }
};

export const removeCustomerById = async (id) => {
  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return { message: "Customer deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting customer: " + error.message);
  }
};
