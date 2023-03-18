const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getReservationValidator = [
  check("id").isNumeric().withMessage("Invalid Reservation id"),
  validatorMiddleware,
];

exports.createReservationValidator = [
  check("nom")
  .notEmpty()
  .withMessage('nom utilisateur requis')
  .isLength({ min: 3 })
  .withMessage('Nom utilisateur trop court'),

  check("email")
  .notEmpty()
  .withMessage('Email utilisateur requis')
  .isEmail()
  .withMessage('adresse email invalide'),
  check("phone")
    .optional()
    .isMobilePhone(['fr-FR'])
    .withMessage('Numéro de téléphone invalide accepté uniquement Numéros de téléphone FR'),
  check("date")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Veuillez ajouter une date"),
  check("nombre_couverts")
    .isLength({ min: 1 })
    .withMessage("Veuillez ajouter le nombre de couverts"),

  check("allergies")
    .exists()
    
    .withMessage("Veuillez ajouter une"),

  validatorMiddleware,
];

exports.updateReservationValidator = [
  check("id").isNumeric().withMessage("Invalid Reservation id"),
  check("nom")
  .notEmpty()
  .withMessage('nom utilisateur requis')
  .isLength({ min: 3 })
  .withMessage('Nom utilisateur trop court'),

  check("email")
  .notEmpty()
  .withMessage('Email utilisateur requis')
  .isEmail()
  .withMessage('adresse email invalide'),
  check("phone")
    .optional()
    .isMobilePhone(['fr-FR'])
    .withMessage('Numéro de téléphone invalide accepté uniquement Numéros de téléphone FR'),
  check("date")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Veuillez ajouter une date"),
  check("nombre_couverts")
    .isLength({ min: 1 })
    .withMessage("Veuillez ajouter le nombre de couverts"),

  check("allergies")
    .exists()
    
    .withMessage("Veuillez ajouter une"),
  validatorMiddleware,
];

exports.deleteReservationValidator = [
  check("id").isNumeric().withMessage("Invalid Reservation id"),
  validatorMiddleware,
];
