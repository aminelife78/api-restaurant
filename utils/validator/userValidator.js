const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getUserValidator = [
  check("id").isNumeric().withMessage("Invalid User id"),
  validatorMiddleware,
];

exports.createUserValidator = [
  check("username")
  .notEmpty()
  .withMessage('nom utilisateur requis')
  .isLength({ min: 3 })
  .withMessage('Nom utilisateur trop court'),

  check("email")
  .notEmpty()
  .withMessage('Email utilisateur requis')
  .isEmail()
  .withMessage('adresse email invalide'),
  
    check("password")
    .notEmpty()
    .withMessage('mot de pas requis')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit être au moins de 6 caractères'),
    check("phone")
    .optional()
    .isMobilePhone(['fr-FR'])
    .withMessage('Numéro de téléphone invalide accepté uniquement Numéros de téléphone FR'),
    check("nombre_convives	")
    .optional()
    .isNumeric()
    .withMessage('nombre convive est un nombre'),
    check("allergies")
    .isLength({ max: 2000 })
    .withMessage('Descriptif trop long'),

  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isNumeric().withMessage("Invalide user id"),
  check("username")
  .notEmpty()
  .withMessage('nom utilisateur requis')
  .isLength({ min: 3 })
  .withMessage('Nom utilisateur trop court'),

  check("email")
  .notEmpty()
  .withMessage('Email utilisateur requis')
  .isEmail()
  .withMessage('adresse email invalide'),
  
    check("password")
    .notEmpty()
    .withMessage('mot de pas requis')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit être au moins de 6 caractères'),
    check("phone")
    .optional()
    .isMobilePhone(['fr-FR'])
    .withMessage('Numéro de téléphone invalide accepté uniquement Numéros de téléphone FR'),
    check("nombre_convives	")
    .optional()
    .isNumeric()
    .withMessage('nombre convive est un nombre'),
    check("allergies")
    .isLength({ max: 2000 })
    .withMessage('Descriptif trop long'),
  validatorMiddleware,
];
