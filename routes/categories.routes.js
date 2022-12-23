const express = require("express");
const router = express.Router();

const {getCategories} = require ("../controllers/categories.controllers.js")


router.get("/categories",getCategories);

module.exports = router;
