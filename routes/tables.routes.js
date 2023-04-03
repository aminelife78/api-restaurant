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
const {createTableValidator,updateTableValidator} = require("../utils/validator/tableValidator")

router.get("/", getTables);
router.post("/",authorisation("admin"),createTableValidator, createTable);
router.get("/:id", getTable);
router.put("/:id",authorisation("admin"),updateTableValidator, updateTable);
router.delete("/:id",authorisation("admin"), deleteTable);

module.exports = router;
