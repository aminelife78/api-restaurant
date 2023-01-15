const db = require("../db/db");
let session = require("express-session");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");


// recuperer toutes les reservations des plats
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await db.query("select u.username,u.email,u.nombre_convives,r.nombre_couvert,r.date_reservation,r.heure_reservation,r.allergies,u.phone from reservations r join reservations_clients rc on (r.id = rc.reservation_id) join clients c on (rc.client_id = c.id) join users u on (u.id = c.user_id)");
  const countreservations = reservations.length;
  res.status(200).json({ result: countreservations, data: reservations });
});

// recuperer une seul reservation

const getReservation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  const reservation = await db.query("select u.username,u.email,u.nombre_convives,r.nombre_couvert,r.date_reservation,r.heure_reservation,r.allergies,u.phone from reservations r join reservations_clients rc on (r.id = rc.reservation_id) join clients c on (rc.client_id = c.id) join users u on (u.id = c.user_id) WHERE r.id=?",[id]);
  if (!reservation[0]) {
    return next(new apiError(`pas de reservations pour ce id ${id}`, 400));
  }
  res.status(200).json({ result: reservation });
});

// creer une categorie
const createReservation = asyncHandler(async (req, res) => {
  const { nombre_couvert,date_reservation,heure_reservation,allergies } = req.body;
  console.log( req.session.user_id)
  const client_id = await db.query("SELECT id FROM clients WHERE user_id=?",[req.session.user_id])
  await db.query("INSERT INTO reservations (nombre_couvert,date_reservation,heure_reservation,allergies) VALUES (?,?,?,?)", [nombre_couvert,date_reservation,heure_reservation,allergies]);
  const reservation_id = await db.query("SELECT id FROM reservations")
  await db.query("INSERT INTO reservations_clients (reservation_id,client_id) VALUES (?,?)",[reservation_id,1])
  
  res.status(201).json({ message: "reservations bien ajouter" });
  
});

// modifier une categorie
const updateReservation = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const Reservation = await db.query("SELECT * FROM reservations WHERE id=?", [id]);

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
  const reservations = await db.query("SELECT * FROM reservations");
  res
    .status(200)
    .json({
      message: `la categorie avec id ${id} est bien supprimer`,
      data: reservations,
    });
});

// exporte crud les reservations
module.exports = {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
};
