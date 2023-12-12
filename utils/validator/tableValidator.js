const validator = require("validator");
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getTableValidator = [
  check("id").isNumeric().withMessage("Invalid table id"),
  validatorMiddleware,
];

exports.createTableValidator = [
  check("time")
    .notEmpty()
    .withMessage("l'heure est obligatoire")

    .matches(/^\d{2}:\d{2}$/)
    .withMessage("Le format de l'heure doit être hh:mm"),

  check("nbr_convive")
    .notEmpty()
    .withMessage("nombre de table obligatoire")
    .isNumeric()
    .withMessage("le nombre de table doit etres un nombre"),


  validatorMiddleware,
];

exports.updateTableValidator = [
  check("id").isNumeric().withMessage("Invalid table id"),
  check("time")
    .notEmpty()
    .withMessage("l'heure est obligatoire")

    .matches(/^\d{2}:\d{2}$/)
    .withMessage("Le format de l'heure doit être hh:mm"),

  check("nbr_convive")
    .notEmpty()
    .withMessage("nombre de table obligatoire")
    .isNumeric()
    .withMessage("le nombre de table doit etres un nombre"),

  validatorMiddleware,
];
