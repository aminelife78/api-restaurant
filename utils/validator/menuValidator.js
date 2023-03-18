const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getMenuValidator = [
  check("id").isNumeric().withMessage("Invalid Menu id"),
  validatorMiddleware,
];

exports.createMenuValidator = [
  check("name")
    .not()
    .isNumeric()
    .withMessage("le titre de menu doit etres une chaine de caractères")
    .not()
    .isEmpty()
    .withMessage("le titre de menu est obligatoire")
    .isLength({ min: 3 })
    .withMessage("le titre de menu trop court")
    .isLength({ max: 20 })
    .withMessage("le titre de menu trop long"),

  validatorMiddleware,
];

exports.updateMenuValidator = [
  check("id").isNumeric().withMessage("Invalid Menu id"),
  check("name")
    .not()
    .isNumeric()
    .withMessage("le titre de menu doit etres une chaine de caractères")
    .not()
    .isEmpty()
    .withMessage("le titre de menu est obligatoire")
    .isLength({ min: 3 })
    .withMessage("le titre de menu trop court")
    .isLength({ max: 20 })
    .withMessage("le titre de menu trop long"),
  validatorMiddleware,
];

exports.deleteMenuValidator = [
  check("id").isNumeric().withMessage("Invalid Menu id"),
  validatorMiddleware,
];
