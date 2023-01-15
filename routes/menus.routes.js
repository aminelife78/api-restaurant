const express = require("express");
const router = express.Router();

const {getMenus,getMenu,createMenu,updateMenu,deleteMenu} = require ("../controllers/menus.controllers.js")
const {authorisation} = require("../controllers/auth.controllers")


router.get("/",getMenus);
router.post("/",authorisation("admin"),createMenu);
router.get("/:id",getMenu);
router.put("/:id",authorisation("admin"),updateMenu);
router.delete("/:id",authorisation("admin"),deleteMenu);

module.exports = router;
