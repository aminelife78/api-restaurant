const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

// recuperer toutes les tables
const getTables = asyncHandler(async (req, res) => {
  const tables = await db.query("SELECT * FROM tables");
  const countTables = tables.length;
  res.status(200).json({ result: countTables, data: tables });
});

// recuperer une seul table

const getTable = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const table = await db.query("SELECT * FROM tables WHERE id=?", [id]);
  if (!table[0]) {
    return next(new apiError(`pas de tables pour ce id ${id}`, 400));
  }
  res.status(200).json({ data: table });
});

// creer une table
const createTable = asyncHandler(async (req, res) => {
  const { numero_table,capacite,disponible } = req.body;
  await db.query("INSERT INTO tables (numero_table,capacite,disponible) VALUES (?,?,?)", [numero_table,capacite,disponible]);
  res
    .status(201)
    .json({ message: "tables bien ajouter" });
});

// modifier une table
const updateTable = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { numero_table,capacite,disponible } = req.body;

  const Table = await db.query("SELECT * FROM tables WHERE id=?", [id]);

  if (!Table[0]) {
    return next(new apiError(`pas de tables pour ce id ${id}`, 400));
  }

  await db.query("UPDATE tables SET numero_table=?,capacite=?,disponible=? WHERE id=?", [numero_table,capacite,disponible, id]);

  res
    .status(200)
    .json({ message: `la table avec id ${id} est bien modifier`});
});

// suprimer une table
const deleteTable = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM tables WHERE id=?", [id]);
  res.status(200).json({
    message: `la table avec id ${id} est bien supprimer`,
   
  });
});

// exporte crud les tables
module.exports = {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
};
