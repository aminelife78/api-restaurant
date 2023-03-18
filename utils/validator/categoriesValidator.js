const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isNumeric().withMessage("Invalid category id"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
  .not()
  .isNumeric()
  .withMessage("le nom de catégories doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("categories est obligatoire")
    .isLength({ min: 3 })
    .withMessage("nom de catégorie trop court")
    .isLength({ max: 20 })
    .withMessage("nom de catégorie trop long"),

  validatorMiddleware,
];



exports.updateCategoryValidator = [
  check("id").isNumeric().withMessage("Invalid category id"),
  check("name")
  .not()
  .isNumeric()
  .withMessage("le nom de catégories doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("categories est obligatoire")
    .isLength({ min: 3 })
    .withMessage("nom de catégorie trop court")
    .isLength({ max: 32 })
    .withMessage("nom de catégorie trop long"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isNumeric().withMessage("Invalid category id"),
  validatorMiddleware,
];
