const express = require("express");
const router = express.Router();
const {authorisation} = require("../controllers/auth.controllers")


const {getFormules,getFormule,createFormule,updateFormule,deleteFormule} = require ("../controllers/formules.controllers")



router.get("/",getFormules);
router.post("/",authorisation("admin"),createFormule);
router.get("/:id",authorisation("admin"),getFormule);
router.put("/:id",authorisation("admin"),updateFormule);
router.delete("/:id",authorisation("admin"),deleteFormule);

module.exports = router;
