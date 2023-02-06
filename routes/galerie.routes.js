const express = require("express");
const router = express.Router();


const {getPhotos,getPhoto,createPhoto,updatePhoto,deletePhoto,uploadGalerieImage,resizeImage} = require ("../controllers/galerie.controllers.js")
const {authorisation} = require("../controllers/auth.controllers")


router.get("/",getPhotos);
router.post("/",authorisation("admin"),uploadGalerieImage,resizeImage,createPhoto);
router.get("/:id",getPhoto);
router.put("/:id",authorisation("admin"),uploadGalerieImage,resizeImage,updatePhoto);
router.delete("/:id",authorisation("admin"),deletePhoto);

module.exports = router;
