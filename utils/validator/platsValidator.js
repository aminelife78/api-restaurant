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
    .withMessage("le titre de plat doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("titre de plat obligatoire")
    .isLength({ min: 3 })
    .withMessage("titre de plat trop court")
    .isLength({ max: 32 })
    .withMessage("titre de plat trop long"),

  check("descreption")
    .notEmpty()
    .withMessage("descreption de plat obligatoire")
    .not()
    .isNumeric()
    .withMessage("la descreption de plat doit etres une chaine de caractères")
    .isLength({ min: 3 })
    .withMessage("descreption de plat trop court")
    .isLength({ max: 255 })
    .withMessage("descreption de plat trop long"),

  check("prix")
    .notEmpty()
    .withMessage("descreption de plat obligatoire")
    .isNumeric()
    .withMessage("le prix de plat doit etres un nombre"),

  check("image").notEmpty().withMessage("image  obligatoire"),

  check("categories_id")
    .notEmpty()
    .withMessage("nom de plat obligatoire")
    .isNumeric()
    .withMessage("le prix de plat doit etres un nombre"),

  validatorMiddleware,
];

exports.updateCarteValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  check("titre")
    .not()
    .isNumeric()
    .withMessage("le titre de plat doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("titre de plat obligatoire")
    .isLength({ min: 3 })
    .withMessage("titre de plat trop court")
    .isLength({ max: 32 })
    .withMessage("titre de plat trop long"),

  check("descreption")
    .notEmpty()
    .withMessage("descreption de plat obligatoire")
    .not()
    .isNumeric()
    .withMessage("la descreption de plat doit etres une chaine de caractères")
    .isLength({ min: 3 })
    .withMessage("descreption de plat trop court")
    .isLength({ max: 255 })
    .withMessage("descreption de plat trop long"),

  check("prix")
    .notEmpty()
    .withMessage("descreption de plat obligatoire")
    .isNumeric()
    .withMessage("le prix de plat doit etres un nombre"),

  check("image").notEmpty().withMessage("image  obligatoire"),

  check("categories_id")
    .notEmpty()
    .withMessage("nom de plat obligatoire")
    .isNumeric()
    .withMessage("le prix de plat doit etres un nombre"),
  validatorMiddleware,
];

exports.deleteCarteValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  validatorMiddleware,
];
