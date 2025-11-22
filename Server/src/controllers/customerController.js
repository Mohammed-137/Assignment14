import Customer from "../models/Customer.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, notes } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const customer = new Customer({ name, email, phone, company, notes });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Customer not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const removed = await Customer.findByIdAndDelete(req.params.id);
    if (!removed)
      return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted", id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
