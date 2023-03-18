const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

// recuperer tous les visiteur
const getVisiteurs = asyncHandler(async (req, res) => {
  const visiteurs = await db.query("SELECT * FROM visiteur");
  const countvisiteur = visiteurs.length;
  res.status(200).json({ result: countvisiteur, data: visiteurs });
});

// recuperer un seul user

const getVisiteur = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const visiteur = await db.query("SELECT * FROM visiteur WHERE id=?", [id]);
  if (!visiteur[0]) {
    return next(new apiError(`pas de visiteur pour ce id ${id}`, 400));
  }
  res.status(200).json({ data: visiteur });
});

// creer un Visiteur
const createVisiteur = asyncHandler(async (req, res) => {
  const { nom, email, phone } = req.body;
  await db.query(
    "INSERT INTO visiteur (email,nom,phone) VALUES (?,?,?)",
    [email, nom, phone]
  );
  const visiteur = await db.query(
    "SELECT id FROM visiteur order by id desc limit 1"
  );

  res.status(201).json({ message: "visiteur bien ajouter", data: visiteur });
});

// modifier un Visiteur
const updateVisiteur = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { nom, email, phone } = req.body;

  const Visiteur = await db.query("SELECT * FROM visiteur WHERE id=?", [id]);

  if (!User[0]) {
    return next(new apiError(`pas de visiteur pour ce id ${id}`, 400));
  }
  const hash = await bcrypt.hash(password, 10);
  await db.query("UPDATE visiteur SET nom=?,email=?,phone=? WHERE id=?", [
    nom,
    email,
    phone,
    id,
  ]);
  res
    .status(200)
    .json({ message: `le visiteur avec id ${id} est bien modifier` });
});

// suprimer un Visiteur
const deleteVisiteur = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM visiteur WHERE id=?", [id]);
  res
    .status(200)
    .json({ message: `le visiteur avec id ${id} est bien supprimer` });
});

// exporte crud les visiteur
module.exports = {
  getVisiteurs,
  getVisiteur,
  createVisiteur,
  updateVisiteur,
  deleteVisiteur,
};
