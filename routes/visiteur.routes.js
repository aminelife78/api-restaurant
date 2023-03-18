const express = require("express");
const router = express.Router();

const {
  getVisiteurs,
  getVisiteur,
  createVisiteur,
  updateVisiteur,
  deleteVisiteur,
} = require("../controllers/visiteur.controllers.js");
const { authorisation } = require("../controllers/auth.controllers");

router.get("/", getVisiteurs);
router.post("/",createVisiteur);
router.get("/:id", getVisiteur);
router.put("/:id", updateVisiteur);
router.delete("/:id", deleteVisiteur);

module.exports = router;
