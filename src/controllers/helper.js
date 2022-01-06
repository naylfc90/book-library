/* src/controllers/helper.js */
const { Book, Reader, Genre, Author } = require("../models");

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    genre: Genre,
    author: Author,
  };

  return models[model];
};

const getForeignKeys = (model) => {
  if (model === "book") return { include: [Genre, Author] };

  if (model === "genre") return { include: Book };

  if (model === "author") return { include: Book };

  return {};
};

const removePassword = (model) => {
  if (model.hasOwnProperty("password")) {
    delete model.password;
  }

  return model;
};

exports.createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newEntry = await Model.create(item);
    const itemWithoutPassword = removePassword(newEntry.dataValues);

    res.status(201).json(itemWithoutPassword);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getItems = async (res, model) => {
  const Model = getModel(model);

  try {
    const withForeignKeys = getForeignKeys(model);
    const items = await Model.findAll({ ...withForeignKeys });
    const itemWithoutPassword = items.map((item) =>
      removePassword(item.dataValues)
    );

    res.status(200).json(itemWithoutPassword);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getItemById = (res, model, id) => {
  const Model = getModel(model);
  const withForeignKeys = getForeignKeys(model);

  return Model.findByPk(id, { ...withForeignKeys }).then((item) => {
    if (!item) {
      res.status(404).json({ error: `The ${model} could not be found.` });
    } else {
      const itemWithoutPassword = removePassword(item.dataValues);

      res.status(200).json(itemWithoutPassword);
    }
  });
};

exports.updateItem = async (res, model, item, id) => {
  const Model = getModel(model);

  try {
    const [itemToUpdate] = await Model.update(item, { where: { id } });
    const updatedItem = await Model.findByPk(id);
    const itemWithoutPassword = removePassword(updatedItem.dataValues);
    res.status(200).json(itemWithoutPassword);
  } catch (error) {
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

exports.getAllBooks = (res, model) => {
  const Model = getModel(model);

  return Model.findAll({ include: Book }).then((items) => {
    res.status(200).json(items);
  });
};
