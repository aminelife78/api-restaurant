const express = require("express");
const router = express.Router();

const {
  getMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menus.controllers.js");
const { authorisation } = require("../controllers/auth.controllers");
const {
  getMenuValidator,
  createMenuValidator,
  updateMenuValidator,
  deleteMenuValidator,
} = require("../utils/validator/menuValidator");

router.get("/", getMenus);
router.post("/", createMenuValidator, createMenu);
router.get("/:id", getMenuValidator, getMenu);
router.put("/:id", authorisation("admin"), updateMenuValidator, updateMenu);
router.delete("/:id", authorisation("admin"), deleteMenuValidator, deleteMenu);

module.exports = router;
