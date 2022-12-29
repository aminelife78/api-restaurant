const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isNumeric().withMessage("Invalid category id"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("categories est obligatoire")
    .isLength({ min: 3 })
    .withMessage("too short category name")
    .isLength({ max: 32 })
    .withMessage("too long category name"),

  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isNumeric().withMessage("Invalid category id"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isNumeric().withMessage("Invalid category id"),
  validatorMiddleware,
];
