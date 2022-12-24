const express = require("express");
const router = express.Router();

const {getCategories,getCategory,createCategory} = require ("../controllers/categories.controllers.js")


router.get("/",getCategories);
router.post("/",createCategory);
router.get("/:id",getCategory);

module.exports = router;
