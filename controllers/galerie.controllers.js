const multer = require("multer");
const fs = require("fs"); // Added to create directories
const cloudinary = require("cloudinary").v2;

const path = require("path");
const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("./uploads/galerie", (err) => {
      cb(null, "./uploads/galerie");
    });
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];

    const filename = `galerie-${Date.now()}-${Math.random() * 1e9}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
const galerieUploadImage = upload.single("image");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// recuperer toutes les images
const getPhotos = asyncHandler(async (req, res) => {
  const photos = await db.query("SELECT * FROM galerie LIMIT 3");
  const countPhotos = photos.length;
  res.status(200).json({ result: countPhotos, data: photos });
});

// recuperer une seul photo

const getPhoto = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const photos = await db.query("SELECT * FROM galerie WHERE id=?", [id]);
  if (!photos[0]) {
    return next(new apiError(`pas de photos pour ce id ${id}`, 400));
  }
  res.status(200).json({ data: photos });
});

// creer une image
const createPhoto = asyncHandler(async (req, res) => {
  const { title } = req.body;
  
  const images = await cloudinary.uploader.upload(req.file.path);
  console.log("milieu")
  await db.query("INSERT INTO galerie (title,image) VALUES (?,?)", [
    title,
    images.url,
  ]);
console.log("end")

  res.status(201).json({ message: "photo bien ajouter", data: photos });
});

// modifier une image
const updatePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image } = req.body;
  const plat = await db.query("SELECT * FROM galerie WHERE id=?", [id]);

  if (!plat[0]) {
    return next(new apiError(`pas de photo pour ce id ${id}`, 400));
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  await db.query("UPDATE galerie SET title=?,image=? WHERE id=?", [
    title,
    result.url,
    id,
  ]);
  const photos = await db.query("SELECT * FROM galerie LIMIT 3");
  res
    .status(200)
    .json({
      message: `la photo avec id ${id} est bien modifier`,
      data: photos,
    });
});

// suprimer une image
const deletePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM galerie WHERE id=?", [id]);
  const photos = await db.query("SELECT * FROM galerie LIMIT 3");
  res
    .status(200)
    .json({
      message: `la photo avec id ${id} est bien supprimer`,
      data: photos,
    });
});

// exporte crud galerie
module.exports = {
  getPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
  galerieUploadImage,
};
