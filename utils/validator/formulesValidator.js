const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getFormuleValidator = [
  check("id").isNumeric().withMessage("Invalid formule id"),
  validatorMiddleware,
];

exports.createFormuleValidator = [
  check("title")
    .not()
    .isNumeric()
    .withMessage("le title de formule doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("title de formule obligatoire")
    .isLength({ min: 3 })
    .withMessage("title de formule trop court")
    .isLength({ max: 32 })
    .withMessage("title de formule trop long"),

  check("descreption")
    .notEmpty()
    .withMessage("descreption de formule obligatoire")
    .not()
    .isNumeric()
    .withMessage("la descreption de formule doit etres une chaine de caractères")
    .isLength({ min: 3 })
    .withMessage("descreption de formule trop court")
    .isLength({ max: 255 })
    .withMessage("descreption de formule trop long"),

  check("prix")
    .notEmpty()
    .withMessage("descreption de formule obligatoire")
    .isNumeric()
    .withMessage("le prix de formule doit etres un nombre"),

  check("menus_id").notEmpty().withMessage("nom de menu obligatoire"),
  validatorMiddleware,
];

exports.updateFormuleValidator = [
  check("id").isNumeric().withMessage("Invalid formule id"),
  check("title")
    .not()
    .isNumeric()
    .withMessage("le title de formule doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("title de formule obligatoire")
    .isLength({ min: 3 })
    .withMessage("title de formule trop court")
    .isLength({ max: 32 })
    .withMessage("title de formule trop long"),

  check("descreption")
    .notEmpty()
    .withMessage("descreption de formule obligatoire")
    .not()
    .isNumeric()
    .withMessage("la descreption de formule doit etres une chaine de caractères")
    .isLength({ min: 3 })
    .withMessage("descreption de formule trop court")
    .isLength({ max: 255 })
    .withMessage("descreption de formule trop long"),

  check("prix")
    .notEmpty()
    .withMessage("descreption de formule obligatoire")
    .isNumeric()
    .withMessage("le prix de formule doit etres un nombre"),

  check("menus_id").notEmpty().withMessage("nom de formule obligatoire"),

  validatorMiddleware,
];

exports.deleteFormuleValidator = [
  check("id").isNumeric().withMessage("Invalid formule id"),
  validatorMiddleware,
];
