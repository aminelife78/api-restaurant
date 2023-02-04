const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const  uploadSingleImage  = require('./multerUploadImages');

const fs = require('fs'); // Added to create directories
// const cloudinary = require('cloudinary').v2
const uploadImage = require("./uploadImage");


const path = require('path');
const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     fs.mkdir('./uploads/plats',(err)=>{
//       cb(null, './uploads/plats');
//    });
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split('/')[1]
    
//     const filename = `plat-${Date.now()}-${Math.random() * 1E9}.${ext}`
//     cb(null, filename)
//    req.body.image = filename
    
  
//   }
// })

// const upload = multer({ storage: storage })
// const platUploadImage = upload.single('image')
// cloudinary.config({
//   cloud_name:process.env.CLOUD_NAME,
//   api_key:process.env.API_KEY,
//   api_secret:process.env.API_SECRET 
// })

// Upload single image
const uploadPlatsImage = uploadSingleImage('image');
// Image processing
const resizeImage = asyncHandler(async (req, res, next) => {
  const filename =  `plats-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/plats/${filename}`);

  // Save image into our db 
   req.body.image = "https://api-restaurant-production.up.railway.app/" + filename;
   console.log(req.hostname)

  next();
});

// recuperer toutes les plats des plats
const getPlats = asyncHandler(async (req, res) => {
  // const {nameCategory} = req.query
  // console.log(nameCategory)
  // let plats;
  // if(nameCategory){
  //   plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats RIGHT JOIN categories  ON categories.id = plats.categories_id WHERE name=? ",[nameCategory]);
  // }else if(nameCategory ===""){
  //   plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats RIGHT JOIN categories  ON categories.id = plats.categories_id");
  // }
  const plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats RIGHT JOIN categories  ON categories.id = plats.categories_id");

  const countPlats = plats.length;
  res.status(200).json({ result: countPlats, data: plats });
});

// recuperer une seul plats

const getPlat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const plat = await db.query("SELECT * FROM plats WHERE id=?", [id]);
  if (!plat[0]) {
    return next(new apiError(`pas de plats pour ce id ${id}`, 400));
  }
  res.status(200).json({ data: plat });
});

// creer une plat
const createPlat = asyncHandler(async (req, res) => {
  const { titre, descreption, prix,image, categories_id } = req.body;
  
  // let images = await uploadImage(req.file.path)
  console.log(image)
  
  // console.log(req.hostname)
  // let images = await cloudinary.uploader.upload(req.file.path)
    await db.query(
      "INSERT INTO plats (titre,descreption,prix,image,categories_id) VALUES (?,?,?,?,?)",
      [titre, descreption, prix, image, categories_id]
    );
       
      
     
      const plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats INNER JOIN categories  ON categories.id = plats.categories_id ");
    
      res.status(201).json({ message: "plats bien ajouter",data: plats });

});

// modifier une plat
const updatePlat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { titre,descreption,prix,image,categories_id } = req.body;

  const plat = await db.query("SELECT * FROM plats WHERE id=?", [id]);

  if (!plat[0]) {
    return next(new apiError(`pas de plats pour ce id ${id}`, 400));
  }
  const result = await cloudinary.uploader.upload(req.file.path)
   
  await db.query("UPDATE plats SET titre=?,descreption=?,prix=?,image=?,categories_id=? WHERE id=?", [titre,descreption,prix,result.url,categories_id, id]);
  const plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats INNER JOIN categories  ON categories.id = plats.categories_id ");

  res.status(200).json({ message: `le plat avec id ${id} est bien modifier`,data:plats });

});

// suprimer une plat
const deleteplat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM plats WHERE id=?", [id]);

  const plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats RIGHT JOIN categories  ON categories.id = plats.categories_id");
  res.status(200).json({ message: `le plat avec id ${id} est bien supprimer`,data: plats});
});

// exporte crud les plats
module.exports = {
  getPlats,
  getPlat,
  createPlat,
  updatePlat,
  deleteplat,
  uploadPlatsImage,
  resizeImage
  
  
};
