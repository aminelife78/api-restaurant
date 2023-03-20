const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getHorairesValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  validatorMiddleware,
];

exports.createHorairesValidator = [
  check("jours ")
    .not()
    .isNumeric()
    .withMessage("le jours  de plat doit etres une chaine de caractères")
    .notEmpty()
    .withMessage("jours  de plat obligatoire")
    .isLength({ min: 3 })
    .withMessage("jours  de plat trop court")
    .isLength({ max: 32 })
    .withMessage("jours  de plat trop long"),

  check("heure_matin")
    .isLength({ max: 11 })
    .withMessage("heure_matin de plat trop long"),
  check("heure_soir")
    .isLength({ max: 11 })
    .withMessage("heure_matin de plat trop long"),

  validatorMiddleware,
];

exports.updateHorairesValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),

  check("heure_matin")
    .isLength({ max: 11 })
    .withMessage("heure_matin de plat trop long"),

  check("heure_soir")
    .isLength({ max: 11 })
    .withMessage("heure_matin de plat trop long"),

  validatorMiddleware,
];

exports.deleteHorairesValidator = [
  check("id").isNumeric().withMessage("Invalid plat id"),
  validatorMiddleware,
];
