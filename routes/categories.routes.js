const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controllers.js");
const { authorisation } = require("../controllers/auth.controllers");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoriesValidator.js");

router.get("/", getCategories);
router.post(
  "/",
  authorisation("admin"),
  createCategoryValidator,
  createCategory
);
router.get("/:id", getCategoryValidator, getCategory);
router.put(
  "/:id",
  authorisation("admin"),
  updateCategoryValidator,
  updateCategory
);
router.delete(
  "/:id",
  authorisation("admin"),
  deleteCategoryValidator,
  deleteCategory
);

module.exports = router;
