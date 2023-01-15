const express = require("express");
const router = express.Router();

const {gethoraires_ouvertes,gethoraires_ouverte,createhoraires_ouverte,updatehoraires_ouverte,deletehoraires_ouverte} = require ("../controllers/horaires_ouverture.controllers.js")
const {authorisation} = require("../controllers/auth.controllers")


router.get("/",gethoraires_ouvertes);
router.post("/",authorisation("admin"),createhoraires_ouverte);
router.get("/:id",gethoraires_ouverte);
router.put("/:id",authorisation("admin"),updatehoraires_ouverte);
router.delete("/:id",authorisation("admin"),deletehoraires_ouverte);

module.exports = router;