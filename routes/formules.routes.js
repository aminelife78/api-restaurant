const express = require("express");
const router = express.Router();
const {authorisation} = require("../controllers/auth.controllers")


const {getFormules,getFormule,createFormule,updateFormule,deleteFormule} = require ("../controllers/formules.controllers")
const {getFormuleValidator,createFormuleValidator,updateFormuleValidator,deleteFormuleValidator} = require("../utils/validator/formulesValidator")


router.get("/",getFormules);
router.post("/",authorisation("admin"),createFormuleValidator,createFormule);
router.get("/:id",getFormuleValidator,getFormule);
router.put("/:id",authorisation("admin"),updateFormuleValidator,updateFormule);
router.delete("/:id",authorisation("admin"),deleteFormuleValidator,deleteFormule);

module.exports = router;
