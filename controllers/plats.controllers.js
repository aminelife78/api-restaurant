const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const path = require("path");
const db = require("../db/db");
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/multer");
const handleUpload = require("../config/cloudinary")
// Upload single image
const uploadGalerieImage = uploadSingleImage("image");

// Image processing
const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `galerie-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat("jpeg")
    .jpeg({ quality: 50 })
    .toFile(`uploads/plats/${filename}`);

  const b64 =  Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  req.body.image = cldRes.url

  // Save image into our db

  // req.body.image = process.env.BASE_URL + "/plats/" + filename;

  next();
});


// recuperer toutes les plats des plats

const getPlats = asyncHandler(async (req, res) => {
  const plats = await db.query(
    "SELECT plats.id ,titre,descreption,prix,image,name FROM plats RIGHT JOIN categories  ON categories.id = plats.categories_id"
  );

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
  const { titre, descreption, prix, image, categories_id } = req.body;

  await db.query(
    "INSERT INTO plats (titre,descreption,prix,image,categories_id) VALUES (?,?,?,?,?)",
    [titre, descreption, prix, image, categories_id]
  );

  res.status(201).json({ message: "plats bien ajouter" });
});

// modifier une plat
const updatePlat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { titre, descreption, prix, image, categories_id } = req.body;

  const plat = await db.query("SELECT * FROM plats WHERE id=?", [id]);

  if (!plat[0]) {
    return next(new apiError(`pas de plats pour ce id ${id}`, 400));
  }

  await db.query(
    "UPDATE plats SET titre=?,descreption=?,prix=?,image=?,categories_id=? WHERE id=?",
    [titre, descreption, prix, image, categories_id, id]
  );

  res.status(200).json({ message: `le plat avec id ${id} est bien modifier` });
});

// suprimer une plat
const deleteplat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM plats WHERE id=?", [id]);

  res.status(200).json({ message: `le plat avec id ${id} est bien supprimer` });
});

// exporte crud les plats
module.exports = {
  getPlats,
  getPlat,
  createPlat,
  updatePlat,
  deleteplat,
  uploadGalerieImage,
  resizeImage,
};















//upload images plats methode diskStorage

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     fs.mkdir('./uploads/plats',(err)=>{
//       cb(null, './uploads/plats');
//    });
//   },
//   filename: async (req, file, cb)=>{
//     const ext = file.mimetype.split('/')[1]

//     const filename = `plat-${Date.now()}-${Math.random() * 1E9}.${ext}`
//     cb(null, filename)

//   }
// })
// const multerFilter = function (req, file, cb) {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new ApiError('Only Images allowed', 400), false);
//   }
// };

// const upload = multer({ storage: storage,fileFilter: multerFilter  })
// const platUploadImage = upload.single('image')