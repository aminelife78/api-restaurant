const multer = require("multer");
const fs = require("fs"); // Added to create directories
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const handleUpload = require("../config/cloudinary");

const path = require("path");
const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/multer");

// Upload single image
const uploadGalerieImage = uploadSingleImage("image");

// Image processing
const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `galerie-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat("jpeg")
    .jpeg({ quality: 50 })
    .toFile(`uploads/galerie/${filename}`);

  // const b64 =  Buffer.from(req.file.buffer).toString("base64");
  // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  // const cldRes = await handleUpload(dataURI);
  // req.body.image = cldRes.url

  // Save image into our db

  req.body.image = process.env.BASE_URL + "/galerie/" + filename;

  next();
});

// recuperer toutes les images
const getPhotos = asyncHandler(async (req, res) => {
  const photos = await db.query("SELECT * FROM galerie LIMIT 8");
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
  // let images = await handleUpload(req.file.path);
  // const images = await cloudinary.uploader.upload(req.file.path);
  await db.query("INSERT INTO galerie (title,image) VALUES (?,?)", [
    title,
    image,
  ]);

  res.status(201).json({ message: "photo bien ajouter" });
});

// modifier une image
const updatePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image } = req.body;
  const plat = await db.query("SELECT * FROM galerie WHERE id=?", [id]);

  if (!plat[0]) {
    return next(new apiError(`pas de photo pour ce id ${id}`, 400));
  }
  await db.query("UPDATE galerie SET title=?,image=? WHERE id=?", [
    title,
    image,
    id,
  ]);
  res.status(200).json({
    message: `la photo avec id ${id} est bien modifier`,
  });
});

// suprimer une image
const deletePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM galerie WHERE id=?", [id]);
  res.status(200).json({
    message: `la photo avec id ${id} est bien supprimer`,
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
