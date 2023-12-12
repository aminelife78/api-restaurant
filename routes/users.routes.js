const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers.js");
const {
  createUserValidator
}  = require("../utils/validator/userValidator")
const { authorisation } = require("../controllers/auth.controllers");


router.get("/",authorisation("admin"), getUsers);
router.post("/",authorisation("admin"),createUserValidator, createUser);
router.get("/:id",authorisation("admin","client"), getUser);
router.put("/:id",authorisation("admin","client"), updateUser);
router.delete("/:id",authorisation("admin"), deleteUser);

module.exports = router;
