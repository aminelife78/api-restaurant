const multer = require("multer");
const fs = require("fs"); // Added to create directories
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const path = require("path");
const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/multer");
const handleUpload = require("../config/cloudinary");

// Upload single image
const uploadGalerieImage = uploadSingleImage("image");

// Image processing
const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `galerie-${uuidv4()}-${Date.now()}.jpeg`;

   await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/galerie/${filename}`);

  // Save image into our db
  

  req.body.image = filename;

  next();
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
  const { title, image } = req.body;
  // let result = await handleUpload(image);
  // const images = await cloudinary.uploader.upload(req.file.path);
  await db.query("INSERT INTO galerie (title,image) VALUES (?,?)", [
    title,
    image,
  ]);
  

  const photos = await db.query("SELECT * FROM galerie LIMIT 3");

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
  // const result = await cloudinary.uploader.upload(req.file.path);
  await db.query("UPDATE galerie SET title=?,image=? WHERE id=?", [
    title,
    image,
    id,
  ]);
  const photos = await db.query("SELECT * FROM galerie LIMIT 3");
  res.status(200).json({
    message: `la photo avec id ${id} est bien modifier`,
    data: photos,
  });
});

// suprimer une image
const deletePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM galerie WHERE id=?", [id]);
  const photos = await db.query("SELECT * FROM galerie LIMIT 3");
  res.status(200).json({
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
  uploadGalerieImage,
  resizeImage,
};
