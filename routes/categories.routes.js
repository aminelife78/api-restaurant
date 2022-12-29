const express = require("express");
const router = express.Router();

const {getCategories,getCategory,createCategory,updateCategory,deleteCategory} = require ("../controllers/categories.controllers.js")
const {authorisation} = require("../controllers/auth.controllers")

router.get("/",getCategories);
router.post("/",authorisation("admin"),createCategory);
router.get("/:id",authorisation("admin"),getCategory);
router.put("/:id",authorisation("admin"),updateCategory);
router.delete("/:id",authorisation("admin"),deleteCategory);

module.exports = router;
