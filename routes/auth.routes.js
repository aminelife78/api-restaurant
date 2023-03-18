const express = require("express");
const router = express.Router();

const {register,login,forgotPassword,verifyPassResetCode,resetPassword,contact} = require ("../controllers/auth.controllers.js")

const {
  signupValidator,loginValidator
}  = require("../utils/validator/authValidator")



router.post("/register",signupValidator,register);
router.post("/login",loginValidator,login);
router.post("/contact",contact);
router.post("/forgotPassword",forgotPassword);
router.post("/verifyResetCode",verifyPassResetCode);
router.post("/resetPassword",resetPassword);





module.exports = router;