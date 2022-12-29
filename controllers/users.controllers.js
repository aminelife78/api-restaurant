const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const bcrypt = require("bcrypt")

// recuperer tous les users
const getUsers = asyncHandler(async (req, res) => {
  const users = await db.query("SELECT * FROM users");
  const countUsers = users.length;
  res.status(200).json({ result: countUsers, data: users });
});

// recuperer un seul users

const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await db.query("SELECT * FROM users WHERE id=?", [id]);
  if (!user[0]) {
    return next(new apiError(`pas de users pour ce id ${id}`, 400));
  }
  res.status(200).json({ result: user });
});

// creer une categorie
const createUser = asyncHandler(async (req, res) => {
  const { username,email,password,role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (username,email,password,role) VALUES (?,?,?,?)", [username,email,hash,role]);
  res.status(201).json({ message: "users bien ajouter" });
});

// modifier une categorie
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { username,email,password,role } = req.body;

  const User = await db.query("SELECT * FROM users WHERE id=?", [id]);

  if (!User[0]) {
    return next(new apiError(`pas de users pour ce id ${id}`, 400));
  }
  const hash = await bcrypt.hash(password, 10);
  await db.query("UPDATE users SET username=?,email=?,password=?,role=? WHERE id=?", [username,email,hash,role, id]);
  res
    .status(200)
    .json({ message: `le User avec id ${id} est bien modifier` });
});

// suprimer une categorie
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM USERS WHERE id=?", [id]);
  res
    .status(200)
    .json({ message: `le User avec id ${id} est bien supprimer` });
});

// exporte crud les users
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
