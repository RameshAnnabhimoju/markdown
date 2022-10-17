import item from "../models/item.model.js";

export const createItem = async (req, res) => {
  try {
    await item
      .create(req.body)
      .then((data) => res.status(201).json(data))
      .catch((error) => next(error));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await item
      .findByIdAndUpdate(id, { deleted: true })
      .then(() => res.json("Deleted succesfully"))
      .catch((error) => next(error));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateItem = (req, res) => {
  const { id } = req.params;
  try {
    item
      .findByIdAndUpdate(id, req.body)
      .then((data) => res.status(200).json(data))
      .catch((error) => next(error));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getItem = (req, res) => {
  const { id } = req.params;
  try {
    item
      .findOne({ _id: id })
      .then((data) => res.status(200).json(data))
      .catch((error) => next(error));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    item
      .find()
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDeletedItems = async (req, res) => {
  try {
    item
      .find({ deleted: true })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {}
};
