const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

// recuperer tous les menus
const getMenus = asyncHandler(async (req, res) => {
  const menus = await db.query("SELECT * FROM menus");
  const countMenus = menus.length;
  res.status(200).json({ result: countMenus, data: menus });
});

// recuperer un seul menus

const getMenu = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const menu = await db.query("SELECT * FROM menus WHERE id=?", [id]);
  if (!menu[0]) {
    return next(new apiError(`pas de menus pour ce id ${id}`, 400));
  }
  res.status(200).json({ result: menu });
});

// creer une categorie
const createMenu = asyncHandler(async (req, res) => {
  const { name } = req.body;
  await db.query("INSERT INTO menus (name) VALUES (?)", [name]);
  res.status(201).json({ message: "menus bien ajouter" });
});

// modifier une categorie
const updateMenu = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const menu = await db.query("SELECT * FROM menus WHERE id=?", [id]);

  if (!menu[0]) {
    return next(new apiError(`pas de menus pour ce id ${id}`, 400));
  }

  await db.query("UPDATE menus SET name=? WHERE id=?", [name, id]);
  res
    .status(200)
    .json({ message: `le menu avec id ${id} est bien modifier` });
});

// suprimer une categorie
const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM menus WHERE id=?", [id]);
  res
    .status(200)
    .json({ message: `le menu avec id ${id} est bien supprimer` });
});

// exporte crud les menus
module.exports = {
  getMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
};
