const db = require("../db/db");
const asyncHandler = require('express-async-handler')


// get list of categories and pagination
const getCategories = asyncHandler(async (req, res) => {
  const categories = await db.query("SELECT * FROM categories")
  res.json({data: categories})
})

module.exports = {
  getCategories,
};
