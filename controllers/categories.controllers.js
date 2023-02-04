const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

// recuperer toutes les categories des plats
const getCategories = asyncHandler(async (req, res) => {
  const categories = await db.query("SELECT * FROM categories");
  const countCategories = categories.length;
  res.status(200).json({ result: countCategories, data: categories });
});

// recuperer une seul categories

const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await db.query("SELECT * FROM categories WHERE id=?", [id]);
  if (!category[0]) {
    return next(new apiError(`pas de categories pour ce id ${id}`, 400));
  }
  res.status(200).json({ data: category });
});

// creer une categorie
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  await db.query("INSERT INTO categories (name) VALUES (?)", [name]);
  const categories = await db.query("SELECT * FROM categories");
  res
    .status(201)
    .json({ message: "categories bien ajouter", data: categories });
});

// modifier une categorie
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await db.query("SELECT * FROM categories WHERE id=?", [id]);

  if (!category[0]) {
    return next(new apiError(`pas de categories pour ce id ${id}`, 400));
  }

  await db.query("UPDATE categories SET name=? WHERE id=?", [name, id]);
  const categories = await db.query("SELECT * FROM categories");

  res
    .status(200)
    .json({ message: `la categorie avec id ${id} est bien modifier`,data:categories });
});

// suprimer une categorie
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM categories WHERE id=?", [id]);
  const categories = await db.query("SELECT * FROM categories");
  res.status(200).json({
    message: `la categorie avec id ${id} est bien supprimer`,
    data: categories,
  });
});

// exporte crud les categories
module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
