const express = require("express");
const router = express.Router();
const { authorisation } = require("../controllers/auth.controllers");

const {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
} = require("../controllers/tables.controllers");

router.get("/", getTables);
router.post("/", createTable);
router.get("/:id", getTable);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

module.exports = router;
