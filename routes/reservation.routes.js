const express = require("express");
const router = express.Router();
const {authorisation} = require("../controllers/auth.controllers")

const {getReservationValidator,createReservationValidator,updateReservationValidator,deleteReservationValidator} = require("../utils/validator/ReservationValidator")

const {getReservations,getReservation,createReservation,updateReservation,deleteReservation} = require ("../controllers/reservation.controllers")


router.get("/",getReservations);
router.post("/",createReservationValidator,createReservation);
router.get("/:id",getReservationValidator,getReservation);
router.put("/:id",updateReservationValidator,updateReservation);
router.delete("/:id",deleteReservationValidator,deleteReservation);

module.exports = router;
