/* src/controllers/helper.js */
const { Book, Reader } = require("../models");

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };

  return models[model];
};

exports.createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItem = await Model.create(item);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getItems = async (res, model) => {
  const Model = getModel(model);

  try {
    const items = await Model.findAll();

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getId = async (res, model, id) => {
  const Model = getModel(model);
  const item = await Model.findByPk(id);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ error: `The ${model} could not be found.` });
  }
};

exports.updateItem = async (res, model, item, id) => {
  const Model = getModel(model);
  const [entry] = await Model.update(item, { where: { id } });

  if (entry) {
    res.status(200).json(entry);
  } else {
    res.status(404).json({ error: `The ${model} could not be found.` });
  }
};

exports.deleteItem = async (res, model, id) => {
  const Model = getModel(model);
  const deleted = await Model.destroy({ where: { id } });

  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: `The ${model} could not be found.` });
  }
};
