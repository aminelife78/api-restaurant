const express = require("express");
const router = express.Router();

const {gethoraires_ouvertes,gethoraires_ouverte,createhoraires_ouverte,updatehoraires_ouverte,deletehoraires_ouverte} = require ("../controllers/horaires_ouverture.controllers.js")
const {authorisation} = require("../controllers/auth.controllers")
const {createHorairesValidator,updateHorairesValidator,getHorairesValidator,deleteHorairesValidator} = require("../utils/validator/horaireValidator")

router.get("/",gethoraires_ouvertes);
router.post("/",authorisation("admin"),createHorairesValidator,createhoraires_ouverte);
router.get("/:id",getHorairesValidator,gethoraires_ouverte);
router.put("/:id",authorisation("admin"),updateHorairesValidator,updatehoraires_ouverte);
router.delete("/:id",authorisation("admin"),deleteHorairesValidator,deletehoraires_ouverte);

module.exports = router;