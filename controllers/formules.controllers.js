const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");



// recuperer toutes les formules
const getFormules = asyncHandler(async (req, res) => {
  const formules = await db.query("SELECT formules.id ,title,descreption,prix,name FROM formules INNER JOIN menus ON menus.id = formules.menus_id");
  const countformules = formules.length;
  res.status(200).json({ result: countformules, data: formules });
});

// recuperer une seul formule

const getFormule = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Formule = await db.query("SELECT * FROM formules WHERE id=?", [id]);
  if (!Formule[0]) {
    return next(new apiError(`pas de formules pour ce id ${id}`, 400));
  }
  res.status(200).json({ result: Formule });
});

// creer une formule
const createFormule = asyncHandler(async (req, res) => {
  const { title, descreption, prix, menus_id } = req.body;
  

  await db.query(
    "INSERT INTO formules (title,	descreption,prix,menus_id) VALUES (?,?,?,?)",
    [title, descreption, prix,menus_id]
  );
  res.status(201).json({ message: "formules bien ajouter" });
});

// modifier une formule
const updateFormule = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title,descreption,prix,menus_id } = req.body;

  const Formule = await db.query("SELECT * FROM formules WHERE id=?", [id]);

  if (!Formule[0]) {
    return next(new apiError(`pas de formules pour ce id ${id}`, 400));
  }

  await db.query("UPDATE formules SET title=? descreption=? prix=? menus_id =? WHERE id=?", [title,descreption,prix,menus_id, id]);
  res.status(200).json({ message: `le Formule avec id ${id} est bien modifier` });
});

// suprimer une formule
const deleteFormule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM formules WHERE id=?", [id]);
  res.status(200).json({ message: `le Formule avec id ${id} est bien supprimer` });
});

// exporte crud les formules
module.exports = {
  getFormules,
  getFormule,
  createFormule,
  updateFormule,
  deleteFormule,
  
  
};
