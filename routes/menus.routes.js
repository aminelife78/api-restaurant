const express = require("express");
const router = express.Router();

const {getMenus,getMenu,createMenu,updateMenu,deleteMenu} = require ("../controllers/menus.controllers.js")
const {authorisation} = require("../controllers/auth.controllers")


router.get("/",getMenus);
router.post("/",createMenu);
router.get("/:id",getMenu);
router.put("/:id",updateMenu);
router.delete("/:id",deleteMenu);

module.exports = router;
