const express = require("express");
const router = express.Router();
const {authorisation} = require("../controllers/auth.controllers")


const {getReservations,getReservation,createReservation,updateReservation,deleteReservation} = require ("../controllers/reservation.controllers")



router.get("/",getReservations);
router.post("/",createReservation);
router.get("/:id",getReservation);
router.put("/:id",updateReservation);
router.delete("/:id",deleteReservation);

module.exports = router;
