const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCarteValidator = [
  check("id").isNumeric().withMessage("Invalid Carte id"),
  validatorMiddleware,
];

exports.createCarteValidator = [
  check("titre")
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



exports.updateCarteValidator = [
  check("id").isNumeric().withMessage("Invalid Carte id"),
  validatorMiddleware,
];

exports.deleteCarteValidator = [
  check("id").isNumeric().withMessage("Invalid Carte id"),
  validatorMiddleware,
];
