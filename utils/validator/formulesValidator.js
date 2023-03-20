const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getFormuleValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  validatorMiddleware,
];

exports.createFormuleValidator = [
  check("title")
    .not()
    .isNumeric()
    .withMessage("le title de plat doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("title de plat obligatoire")
    .isLength({ min: 3 })
    .withMessage("title de plat trop court")
    .isLength({ max: 32 })
    .withMessage("title de plat trop long"),

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

  check("menus_id").notEmpty().withMessage("nom de menu obligatoire"),
  validatorMiddleware,
];

exports.updateFormuleValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  check("title")
    .not()
    .isNumeric()
    .withMessage("le title de plat doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("title de plat obligatoire")
    .isLength({ min: 3 })
    .withMessage("title de plat trop court")
    .isLength({ max: 32 })
    .withMessage("title de plat trop long"),

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

  check("menus_id").notEmpty().withMessage("nom de plat obligatoire"),

  validatorMiddleware,
];

exports.deleteFormuleValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  validatorMiddleware,
];
