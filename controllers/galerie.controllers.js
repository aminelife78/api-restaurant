const multer  = require('multer')
const fs = require('fs'); // Added to create directories

const path = require('path');
const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir('./uploads/galerie',(err)=>{
      cb(null, './uploads/galerie');
   });
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    
    const filename = `galerie-${Date.now()}-${Math.random() * 1E9}.${ext}`
    cb(null, filename)
    req.body.image = filename
      }
})

const upload = multer({ storage: storage })
const galerieUploadImage = upload.single('image')


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
  res.status(200).json({ result: photos });
});

// creer une image
const createPhoto = asyncHandler(async (req, res) => {
  const { title,image } = req.body;
  console.log(title, image);
  await db.query("INSERT INTO galerie (title,image) VALUES (?,?)", [title,image]);
  res.status(201).json({ message: "photo bien ajouter" });
});

// modifier une image
const updatePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title,image } = req.body;
  const plat = await db.query("SELECT * FROM galerie WHERE id=?", [id]);

  if (!plat[0]) {
    return next(new apiError(`pas de photo pour ce id ${id}`, 400));
  }

  // await db.query("UPDATE galerie SET title=?,image=? WHERE id=?", [title,image, id]);
  await db.query("INSERT INTO galerie (title,image) VALUES (?,?) WHERE id=?", [title,image,id]);
  
  res.status(200).json({ message: `la photo avec id ${id} est bien modifier` });

  
});

// suprimer une image
const deletePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM galerie WHERE id=?", [id]);
  const photos = await db.query("SELECT * FROM galerie LIMIT 3")
  res
    .status(200)
    .json({ message: `la photo avec id ${id} est bien supprimer`,data:photos });
});

// exporte crud galerie
module.exports = {
  getPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
  galerieUploadImage
  
};
