const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

// recuperer toutes les horaires
const gethoraires_ouvertes = asyncHandler(async (req, res) => {
  const horaires_ouverte = await db.query("SELECT * FROM horaires_ouverture");
  const counthoraires_ouverte = horaires_ouverte.length;
  res.status(200).json({ result: counthoraires_ouverte, data: horaires_ouverte });
});

// recuperer une seul horaires_ouverte

const gethoraires_ouverte = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const horaires_ouvertes = await db.query("SELECT * FROM horaires_ouverte WHERE id=?", [id]);
  if (!horaires_ouvertes[0]) {
    return next(new apiError(`pas de horaires_ouvertes pour ce id ${id}`, 400));
  }
  res.status(200).json({ result: horaires_ouvertes });
});

// creer une categorie
const createhoraires_ouverte = asyncHandler(async (req, res) => {
  const { heure_matin	,heure_soir,jours	 } = req.body;
  await db.query("INSERT INTO horaires_ouverture (heure_matin	,heure_soir,jours	) VALUES (?,?,?)", [heure_matin	,heure_soir,jours	]);
  res.status(201).json({ message: "horaires_ouverture bien ajouter" });
});

// modifier une categorie
const updatehoraires_ouverte = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const horaires_ouverte = await db.query("SELECT * FROM horaires_ouverture WHERE id=?", [id]);

  if (!horaires_ouverte[0]) {
    return next(new apiError(`pas de horaires_ouverture pour ce id ${id}`, 400));
  }

  await db.query("UPDATE horaires_ouverture SET name=? WHERE id=?", [name, id]);
  res
    .status(200)
    .json({ message: `la categorie avec id ${id} est bien modifier` });
});

// suprimer une categorie
const deletehoraires_ouverte = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM horaires_ouverture WHERE id=?", [id]);
  res
    .status(200)
    .json({ message: `la categorie avec id ${id} est bien supprimer` });
});

// exporte crud les horaires_ouverte
module.exports = {
  gethoraires_ouvertes,
  gethoraires_ouverte,
  createhoraires_ouverte,
  updatehoraires_ouverte,
  deletehoraires_ouverte,
};
