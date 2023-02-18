const db = require("../db/db");
let session = require("express-session");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const { authorisation } = require("../controllers/auth.controllers");

// recuperer toutes les reservations des plats
const getReservations = asyncHandler(async (req, res) => {
  const {rDate,rHeure,rCouverts} = req.query
  console.log(parseInt(rCouverts))
  
  if(parseInt(rCouverts) ) {
    const reservations = await db.query("select r.id,r.date,r.heure,r.nombre_couverts,r.allergies,u.username,u.phone,u.nombre_convives,u.email from reservations as r LEFT JOIN  users as u ON r.clients_id = u.id WHERE nombre_couverts =?  ",[parseInt(rCouverts)]);
     res.status(200).json({ data: reservations });
  }else if(rDate){
    const reservations = await db.query("select  r.id, r.date,r.heure,r.nombre_couverts,r.allergies,u.username,u.phone,u.nombre_convives,u.email from reservations as r LEFT JOIN  users as u ON r.clients_id = u.id WHERE date =?  ",[rDate]);
     res.status(200).json({ data: reservations });
  }else if(rHeure){
    const reservations = await db.query("select  r.id, r.date,r.heure,r.nombre_couverts,r.allergies,u.username,u.phone,u.nombre_convives,u.email from reservations as r LEFT JOIN  users as u ON r.clients_id = u.id WHERE heure =?  ",[rHeure]);
     res.status(200).json({ data: reservations });
  }
  else{
    const reservations = await db.query("select   r.id, r.date,r.heure,r.nombre_couverts,r.allergies,u.username,u.phone,u.nombre_convives,u.email from reservations as r LEFT JOIN  users as u ON r.clients_id = u.id");
    res.status(200).json({ data: reservations });
  }
  
});

// recuperer une seul reservation

const getReservation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const reservation = await db.query(
    "select u.username,u.email,u.nombre_convives,r.nombre_couvert,r.date_reservation,r.heure_reservation,r.allergies,u.phone from reservations r join reservations_clients rc on (r.id = rc.reservation_id) join clients c on (rc.client_id = c.id) join users u on (u.id = c.user_id) WHERE r.id=?",
    [id]
  );
  if (!reservation[0]) {
    return next(new apiError(`pas de reservations pour ce id ${id}`, 400));
  }
  res.status(200).json({ data: reservation });
});

// creer une categorie
const createReservation = asyncHandler(async (req, res, next) => {
  const { nombre_couverts, date, heure, allergies, visiteur_id, clients_id } =
    req.body;
  const table_disponible = await db.query(
    "SELECT SUM(nombre_couverts) as total FROM reservations WHERE date = ? AND heure = ?",
    [date, heure]
  );
  const total_reservation_heure = table_disponible[0].total;
  console.log(total_reservation_heure);
  console.log(Number(nombre_couverts) + Number(total_reservation_heure));
  if (Number(nombre_couverts) + Number(total_reservation_heure) > 12) {
    return next(new apiError(`pas de table disponible pour cette date`, 400));
  } else {
    if (authorisation("client")) {
      await db.query(
        "INSERT INTO reservations (nombre_couverts,date,heure,allergies,clients_id) VALUES (?,?,?,?,?)",
        [nombre_couverts, date, heure, allergies, clients_id]
      );
      res.status(200).json({ message: "reservation bien ajouter" });
    } else {
      await db.query(
        "INSERT INTO reservations (nombre_couverts,date,heure,allergies,clients_id) VALUES (?,?,?,?,?)",
        [nombre_couverts, date, heure, allergies, visiteur_id]
      );
      res.status(200).json({ message: "reservation bien ajouter" });
    }
  }
});

// modifier une categorie
const updateReservation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const Reservation = await db.query("SELECT * FROM reservations WHERE id=?", [
    id,
  ]);

  if (!Reservation[0]) {
    return next(new apiError(`pas de reservations pour ce id ${id}`, 400));
  }

  await db.query("UPDATE reservations SET name=? WHERE id=?", [name, id]);
  res
    .status(200)
    .json({ message: `la categorie avec id ${id} est bien modifier` });
});

// suprimer une categorie
const deleteReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM reservations WHERE id=?", [id]);
  res.status(200).json({
    message: `la categorie avec id ${id} est bien supprimer`,
    
  });
});

// exporte crud les reservations
module.exports = {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
