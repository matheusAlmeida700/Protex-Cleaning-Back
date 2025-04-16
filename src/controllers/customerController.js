import {
  fetchAllCustomers,
  fetchCustomerById,
  addNewCustomer,
  addMultipleCustomers,
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
    const data = req.body;

    if (Array.isArray(data)) {
      const errors = [];
      for (const item of data) {
        const { error } = customerSchema.validate(item, { abortEarly: false });
        if (error) {
          errors.push(...error.details.map((err) => err.message));
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newCustomers = await addMultipleCustomers(data);
      return res.status(201).json({ newCustomers });
    } else {
      const { error } = customerSchema.validate(data, { abortEarly: false });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((err) => err.message) });
      }

      const newCustomer = await addNewCustomer(data);
      return res.status(201).json({ newCustomer });
    }
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
