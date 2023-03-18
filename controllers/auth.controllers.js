const db = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const sendEmail = require("../utils/sendEmail");
const moment = require("moment");

// inscréption
const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, nombre_convives, phone, allergies } =
    req.body;
  // 1 verifier si l'email existe deja?
  const countEmail = await db.query(
    "SELECT count(email) as number FROM users WHERE email=?",
    [req.body.email]
  );
  if (countEmail[0].number > 0) {
    return next(
      new apiError(
        "cet email existe deja, veillez saisir un nouveau email",
        400
      )
    );
  }

  // 2 cryptage de mot de passe

  const hash = await bcrypt.hash(password, 10);

  // creer user
  await db.query(
    "INSERT INTO users (username,email,password,nombre_convives,phone,allergies) VALUES (?,?,?,?,?,?)",
    [username, email, hash, nombre_convives, phone, allergies]
  );

  const user = await db.query("SELECT * FROM users WHERE email=?", [email]);

  // generer un token
  const token = jwt.sign(
    {
      userId: user[0].id,
      userRole: user[0].role,
      userPhone: user[0].phone,
      userEmail: user[0].email,
      userConvives: user[0].nombre_convives,
      userNom: user[0].username,
      userAllergies: user[0].allergies,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
  res.status(201).json({ data: user, token });
});

// connextion
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (!user[0]) {
    const message = "L'utilisateur demandée n'existe pas";
    return next(new apiError(message), 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);

  console.log(isPasswordValid);
  if (!isPasswordValid) {
    const message = "Email ou mot de passe  est incorrecte.";
    return res.status(404).json({ message });
  } else {
    // jwt
    const token = jwt.sign(
      {
        userId: user[0].id,
        userRole: user[0].role,
        userPhone: user[0].phone,
        userEmail: user[0].email,
        userConvives: user[0].nombre_convives,
        userNom: user[0].username,
        userAllergies: user[0].allergies,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );
    req.session.user_id = user[0].id;
    console.log(req.session.user_id);
    const message = `L'utilisateur a été connecté avec succès`;
    return res.json({ message, data: user, token });
  }
});

// verifier token (autorisation)
const authorisation = (...myRole) => {
  return asyncHandler(async (req, res, next) => {
    // recuperation si le token existe dans header
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
      return next(new apiError(message), 401);
    }

    // recupération token et le vérifier
    const token = authorizationHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (error, decodedToken) => {
        if (error) {
          const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
          return res.status(401).json({ message, data: error });
        }
        const userId = decodedToken.userId;

        const currentUser = await db.query("SELECT * FROM users WHERE id=?", [
          userId,
        ]);
        if (!currentUser[0]) {
          const message = `L'utilisateur n'existe pas pour ce token.`;
          return next(new apiError(message), 401);
        }
        if (!myRole.includes(currentUser[0].role)) {
          return next(
            new apiError("vous n'etes pas autorisé a éffectué cette tache"),
            403
          );
        }
        next();
      }
    );
  });
};

// @desc    reset mot de passe oublier
// @route   POST /api/v1/auth/forgotPassword
// @access  Public

const forgotPassword = asyncHandler(async (req, res, next) => {
  // 1 recuperé user par email
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (!user[0]) {
    const message = "L'utilisateur demandée n'existe pas";
    return next(new apiError(message), 404);
  }
  // 2 si le user existe, générer un code a 6 chifres et sauvgarder dans DB

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashResetCode = crypto
    .createHmac("sha256", resetCode)
    .update("rien")
    .digest("hex");

  // ajouter le hashResetCode et  l'expiration de hashResetCode dans DB

  // Définir la date-heure initiale
  const dateHeure = moment();

  // Ajouter 10 minutes
  const nouvelleDateHeure = dateHeure.add(10, "minutes");

  // Afficher la nouvelle date-heure
  const newDate = nouvelleDateHeure.format("YYYY-MM-DD HH:mm");

  await db.query(
    "UPDATE users SET passwordResetCode=?,passwordResetExpires=?,passwordResetVirified=? where email=?",
    [hashResetCode, newDate, false, email]
  );

  // 3 envoyer le code par email
  const message = `Bonjour ${user[0].username},\n Nous avons reçu une demande de réinitialisation du mot de passe sur votre compte E-chicken. \n ${resetCode} \n Entrez ce code pour terminer la réinitialisation. \n Merci de nous aider à sécuriser votre compte.\n L'équipe E-chiken`;
  await sendEmail({
    mail: "E-chiken App <aminelife93@gmail.com>",
    email: email,
    subject: "votre mot de passe reset code (valide pour 10 min)",
    message: message,
  });
  res.status(200).json({
    status: "Success",
    message: "Reset code est bien envoyé pour email",
  });
});

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
const verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) recuperer user qui correspond  resetCode
  const { resetCode } = req.body;
  const hashResetCode = crypto
    .createHmac("sha256", resetCode)
    .update("rien")
    .digest("hex");

  const user = await db.query("SELECT * from users WHERE passwordResetCode=?", [
    hashResetCode,
  ]);

  if (!user[0]) {
    const message = "reset code invalide";
    return next(new apiError(message), 404);
  }

  // 2) Reset code valide
  await db.query("UPDATE users SET passwordResetVirified=?  WHERE id=?", [
    true,
    user[0].id,
  ]);

  res.status(200).json({
    status: "Success",
  });
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  // 1 recuperé user par email
  const { email, newPassword } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email=?", [email]);

  if (!user[0]) {
    const message = "L'utilisateur demandée n'existe pas";
    return next(new apiError(message), 404);
  }

  // 2) Check if reset code verified
  if (!user[0].passwordResetVirified) {
    return next(new apiError("Reset code not verified", 400));
  }

  const hash = await bcrypt.hash(newPassword, 10);

  await db.query("UPDATE users SET password=? WHERE id=?", [hash, user[0].id]);

  // 3) if everything is ok, generate token
  // generer un token
  const token = jwt.sign(
    {
      userId: user[0].id,
      userRole: user[0].role,
      userPhone: user[0].phone,
      userEmail: user[0].email,
      userConvives: user[0].nombre_convives,
      userNom: user[0].username,
      userAllergies: user[0].allergies,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
  res.status(201).json({ token });
});

// @desc    Contact le restaurant
// @route   POST /api/v1/auth/contact
// @access  Public
const contact = asyncHandler(async (req, res, next) => {
  const { prenom, mail, subject, message } = req.body;
  await sendEmail({
    prenom,
    mail,
    email: "E-chiken App <aminelife93@gmail.com>",
    subject,
    html: `<p>From: ${prenom}</p><p>Email: ${mail}</p><p>Message: ${message}</p>`,
  });
  res.status(200).json({
    status: "Success",
    message: "Reset code est bien envoyé pour email",
  });
});

module.exports = {
  register,
  login,
  contact,
  authorisation,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
};
