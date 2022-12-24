const express = require("express");
const router = express.Router();

const {getCategories,getCategory,createCategory,updateCategory,deleteCategory} = require ("../controllers/categories.controllers.js")


router.get("/",getCategories);
router.post("/",createCategory);
router.get("/:id",getCategory);
router.put("/:id",updateCategory);
router.delete("/:id",deleteCategory);

module.exports = router;
