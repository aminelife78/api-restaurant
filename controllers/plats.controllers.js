const multer  = require('multer')
const fs = require('fs'); // Added to create directories

const path = require('path');
const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir('./uploads/plats',(err)=>{
      cb(null, './uploads/plats');
   });
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    
    const filename = `plat-${Date.now()}-${Math.random() * 1E9}.${ext}`
    cb(null, filename)
    req.body.image = filename
    
  
  }
})

const upload = multer({ storage: storage })
const platUploadImage = upload.single('image')


// recuperer toutes les plats des plats
const getPlats = asyncHandler(async (req, res) => {
  const {categoryName} = req.query
  let plats;
  if(categoryName){
    plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats RIGHT JOIN categories  ON categories.id = plats.categories_id WHERE name=?",[categoryName]);
  }else{
    plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats RIGHT JOIN categories  ON categories.id = plats.categories_id");
  }
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
  res.status(200).json({ result: plat });
});

// creer une plat
const createPlat = asyncHandler(async (req, res) => {
  const { titre, descreption,image, prix, categories_id } = req.body;
  await db.query(
    "INSERT INTO plats (titre,	descreption,prix,image,categories_id) VALUES (?,?,?,?,?)",
    [titre, descreption, prix, image, categories_id]
  );
  res.status(201).json({ message: "plats bien ajouter" });
});

// modifier une plat
const updatePlat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { titre,descreption,prix,image,categories_id } = req.body;
  console.log(titre,descreption,prix,image,categories_id)

  const plat = await db.query("SELECT * FROM plats WHERE id=?", [id]);

  if (!plat[0]) {
    return next(new apiError(`pas de plats pour ce id ${id}`, 400));
  }

  await db.query("UPDATE plats SET titre=?,descreption=?,prix=?,image=?,categories_id=? WHERE id=?", [titre,descreption,prix,image,categories_id, id]);
  res.status(200).json({ message: `le plat avec id ${id} est bien modifier` });
});

// suprimer une plat
const deleteplat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM plats WHERE id=?", [id]);

  const plats = await db.query("SELECT plats.id ,titre,descreption,prix,image,name FROM plats INNER JOIN categories ON categories.id = plats.categories_id");
  res.status(200).json({ message: `le plat avec id ${id} est bien supprimer`,data:plats });
});

// exporte crud les plats
module.exports = {
  getPlats,
  getPlat,
  createPlat,
  updatePlat,
  deleteplat,
  platUploadImage
  
};
