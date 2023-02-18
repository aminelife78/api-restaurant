const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCarteValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  validatorMiddleware,
];

exports.createCarteValidator = [
  check("titre")
  .not()
  .isNumeric()
  .withMessage("le nom de plat doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("nom de plat obligatoire")
    .isLength({ min: 3 })
    .withMessage("nom de plat trop court")
    .isLength({ max: 32 })
    .withMessage("nom de plat trop long"),
    check("descreption")
  .not()
  .isNumeric()
  .withMessage("le nom de plat doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("nom de plat obligatoire")
    .isLength({ min: 3 })
    .withMessage("nom de plat trop court")
    .isLength({ max: 32 })
    .withMessage("nom de plat trop long"),

  validatorMiddleware,
];



exports.updateCarteValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  check("titre")
  .not()
  .isNumeric()
  .withMessage("le nom de plat doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("nom de plat obligatoire")
    .isLength({ min: 3 })
    .withMessage("nom de plat trop court")
    .isLength({ max: 32 })
    .withMessage("nom de plat trop long"),
  validatorMiddleware,
];

exports.deleteCarteValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  validatorMiddleware,
];
