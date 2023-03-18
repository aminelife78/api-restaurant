const express = require("express");
const router = express.Router();

const {register,login,forgotPassword,verifyPassResetCode,resetPassword,contact} = require ("../controllers/auth.controllers.js")

const {
  signupValidator,loginValidator,logout
}  = require("../utils/validator/authValidator")



router.post("/register",signupValidator,register);
router.post("/login",login);
router.post("/contact",contact);
router.post("/forgotPassword",forgotPassword);
router.post("/verifyResetCode",verifyPassResetCode);
router.post("/resetPassword",logout,resetPassword);





module.exports = router;