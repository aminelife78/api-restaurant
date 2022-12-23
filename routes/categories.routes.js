const express = require("express");
const router = express.Router();

const {getCategories} = require ("../controllers/categories.controllers.js")


router.get("/",getCategories);

module.exports = router;
