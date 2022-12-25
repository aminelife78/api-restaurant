const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

// recuperer toutes les plats des plats
const getPlats = asyncHandler(async (req, res) => {
  const plats = await db.query("SELECT * FROM plats");
  const countPlats = plats.length;
  res.status(200).json({ result: countPlats, data: plats });
});

// recuperer une seul plats

const getPlat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const plat = await db.query("SELECT * FROM plats WHERE id=?", [id]);
  if (!plat[0]) {
    return next(new apiError(`pas de plats pour ce id ${id}`, 400));
  }
  res.status(200).json({ result: plat });
});

// creer une plat
const createPlat = asyncHandler(async (req, res) => {
  const { titre,	descreption,prix,categories_id } = req.body;
  await db.query("INSERT INTO plats (titre,	descreption,prix,categories_id) VALUES (?,?,?,?)", [titre,	descreption,prix,categories_id]);
  res.status(201).json({ message: "plats bien ajouter" });
});

// modifier une plat
const updatePlat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const plat = await db.query("SELECT * FROM plats WHERE id=?", [id]);

  if (!plat[0]) {
    return next(new apiError(`pas de plats pour ce id ${id}`, 400));
  }

  await db.query("UPDATE plats SET name=? WHERE id=?", [name, id]);
  res
    .status(200)
    .json({ message: `le plat avec id ${id} est bien modifier` });
});

// suprimer une plat
const deleteplat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM plats WHERE id=?", [id]);
  res
    .status(200)
    .json({ message: `le plat avec id ${id} est bien supprimer` });
});

// exporte crud les plats
module.exports = {
  getPlats,
  getPlat,
  createPlat,
  updatePlat,
  deleteplat,
};
