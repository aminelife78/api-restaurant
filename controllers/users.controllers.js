const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const bcrypt = require("bcrypt")

// recuperer tous les users
const getUsers = asyncHandler(async (req, res) => {
  const users = await db.query("SELECT * FROM users WHERE role =?",["client"]);
  const countUsers = users.length;
  res.status(200).json({ result: countUsers, data: users });
});

// recuperer un seul user

const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await db.query("SELECT * FROM users WHERE id=?", [id]);
  if (!user[0]) {
    return next(new apiError(`pas de users pour ce id ${id}`, 400));
  }
  res.status(200).json({ result: user });
});

// creer un user
const createUser = asyncHandler(async (req, res) => {
  const { username,email,password,role,nombre_convives,phone } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (username,email,password,role,nombre_convives,phone) VALUES (?,?,?,?,?,?)", [username,email,hash,role,nombre_convives,phone]);
  res.status(201).json({ message: "users bien ajouter" });
});

// modifier un user
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { username,email,password,role,nombre_convives,phone } = req.body;

  const User = await db.query("SELECT * FROM users WHERE id=?", [id]);

  if (!User[0]) {
    return next(new apiError(`pas de users pour ce id ${id}`, 400));
  }
  const hash = await bcrypt.hash(password, 10);
  await db.query("UPDATE users SET username=?,email=?,password=?,role=?,nombre_convives=?,phone=? WHERE id=?", [username,email,hash,role,nombre_convives,phone, id]);
  res
    .status(200)
    .json({ message: `le User avec id ${id} est bien modifier` });
});

// suprimer un user
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
