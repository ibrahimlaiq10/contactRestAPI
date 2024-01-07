const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactsModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.json({ message: "send all contacts", data: contacts });
});

const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({ name, email, phone });
  res.json({ message: "create contacts", contact });
});
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.json({ message: "send single contact", contact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  const deleteContact = await Contact.deleteOne({ _id: req.params.id });

  res.json({ message: "delete single contact" });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json({ message: "update single contact", contact: updatedContact });
});

module.exports = {
  getContacts,
  addContact,
  getContact,
  deleteContact,
  updateContact,
};
