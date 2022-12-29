const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers.js");
const { authorisation } = require("../controllers/auth.controllers");

router.get("/", authorisation("admin"), getUsers);
router.post("/", authorisation("admin"), createUser);
router.get("/:id", authorisation("admin"), getUser);
router.put("/:id", authorisation("admin"), updateUser);
router.delete("/:id", authorisation("admin"), deleteUser);

module.exports = router;
