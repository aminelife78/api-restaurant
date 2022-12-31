const express = require("express");
const router = express.Router();
const {authorisation} = require("../controllers/auth.controllers")


const {getFormules,getFormule,createFormule,updateFormule,deleteFormule} = require ("../controllers/formules.controllers")



router.get("/",getFormules);
router.post("/",createFormule);
router.get("/:id",getFormule);
router.put("/:id",updateFormule);
router.delete("/:id",deleteFormule);

module.exports = router;
