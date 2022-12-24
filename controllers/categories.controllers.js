const db = require("../db/db");
const asyncHandler = require('express-async-handler')


// recuperer toutes les categories des plats
const getCategories = asyncHandler(async (req, res) => {
  const categories = await db.query("SELECT * FROM categories")
  const countCategories = categories.length
  res.status(200).json({result:countCategories,data: categories})
})


// recuperer une seul categories

const getCategory = asyncHandler(async (req, res) => {
  const {id} = req.params
  const category = await db.query("SELECT * FROM categories WHERE id=? OR like",[id])
  res.status(200).json({result:category})
})

// creer une categorie
const createCategory = asyncHandler(async (req, res) => {
  const {name} = req.body
  await db.query("INSERT INTO categories (name) VALUES (?)", [
    name,
  ]);
  res.status(201).json({message:"categories bien ajouter"})
})

// 

// 
module.exports = {
  getCategories,
  getCategory,
  createCategory
};
