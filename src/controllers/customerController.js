import {
  fetchAllCustomers,
  fetchCustomerById,
  addNewCustomer,
  modifyCustomerById,
  removeCustomerById,
} from "../services/customerService.js";
import { customerSchema } from "../utils/validators.js";

export const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await fetchAllCustomers();
    res.json({ customers });
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await fetchCustomerById(id);
    res.json({ customer });
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (req, res, next) => {
  try {
    const { error } = customerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }
    const newCustomer = await addNewCustomer(req.body);
    res.status(201).json({ newCustomer });
  } catch (error) {
    next(error);
  }
};

export const updateCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedCustomer = await modifyCustomerById(id, updatedData);
    res.status(200).json({ updatedCustomer });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removeCustomerById(id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
