const db = require("../db/db");
const apiError = require("../utils/apiError");
let session = require("express-session");
const asyncHandler = require("express-async-handler");

const { authorisation } = require("../controllers/auth.controllers");
const moment = require("moment");
const sendEmail = require("../utils/sendEmail");



// test get reservation

const getReservations = asyncHandler(async (req, res) => {
  const { date, nombreCouverts } = req.query;
  const dateLocale = moment(date).format("YYYY-MM-DD");

  if (dateLocale && nombreCouverts) {
    const reservedHours = await db.query(
      "SELECT heure, SUM(nombre_couverts) AS totalCouverts " +
      "FROM reservations " +
      "WHERE date = ? " +
      "GROUP BY heure",
      [dateLocale]
    );

    const maxCouverts = await db.query(
      "SELECT time, nbr_convive FROM tables"
    );

    const availableHours = [];

    maxCouverts.forEach((table) => {
      const heure = table.time;
      const capaciteTable = table.nbr_convive;
      const couvertsReserves = reservedHours.find((entry) => entry.heure === heure);

      if (!couvertsReserves || (capaciteTable - couvertsReserves.totalCouverts) >= nombreCouverts) {
        availableHours.push(heure);
      }
    });

    res.status(200).json({ availableHours });
  } else {
    const reservations = await db.query(
            "select * from reservations ORDER BY id DESC"
          );
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



//  creer une reservation
const createReservation = asyncHandler(async (req, res, next) => {
    const {
      nom,
      email,
      phone,
      nombre_couverts,
      date,
      heure,
      allergies,
      visiteur_id,
      clients_id,
    } = req.body;
    
    const dateLocale = moment(date).format("YYYY-MM-DD");
    const heures = heure.toString();
  
  
      await db.query(
        "INSERT INTO reservations (nom,email,phone,nombre_couverts,date,heure,allergies) VALUES (?,?,?,?,?,?,?)",
        [nom, email, phone, nombre_couverts, dateLocale, heure, allergies]
      );
      const message = `Cher(e) ${nom},\n Nous vous remercions de votre demande de réservation au Ahmed Kitchen pour ${dateLocale} à ${heure}. Nous vous réservons une table pour ${nombre_couverts} personnes, à ${heure} le ${dateLocale}, comme demandé. Nous sommes impatients de vous accueillir et de vous faire découvrir notre cuisine.\n \n En attendant votre visite, n'hésitez pas à consulter notre menu sur notre site web, ainsi que nos offres spéciales pour des événements particuliers.\n Cordialement,\n Ahmed Zeyd`;
  
      sendEmail({
        mail: "E-chiken App <ahmedkitchen238@gmail.com>",
        email: email,
        subject: "Confirmation de réservation de table au restaurant",
        message: message,
      });
      res.status(200).json({ message: "reservation bien ajouter" });
    }
  );
  
















// modifier une reservation
const updateReservation = asyncHandler(async (req, res, next) => {
  const {
    nombre_couverts,
    date,
    heure,
    allergies,
    nom,
    phone,
    email,
    visiteur_id,
    clients_id,
  } = req.body;
  const { id } = req.params;

  const Reservation = await db.query("SELECT * FROM reservations WHERE id=?", [
    id,
  ]);

  if (!Reservation[0]) {
    return next(new apiError(`pas de reservations pour ce id ${id}`, 400));
  }

  await db.query(
    "UPDATE reservations SET nom=?,email=?,phone=?,nombre_couverts=?,allergies=?,date=?,heure=? WHERE id=?",
    [nombre_couverts, date, heure, allergies, nom, phone, email, id]
  );
  res
    .status(200)
    .json({ message: `la categorie avec id ${id} est bien modifier` });
});

// suprimer une reservation
const deleteReservation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM reservations WHERE id=?", [id]);
  res.status(200).json({
    message: `la reservation avec id ${id} est bien supprimer`,
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


















