const express = require("express");
const router = express.Router();


const {getPhotos,getPhoto,createPhoto,updatePhoto,deletePhoto,uploadGalerieImage,resizeImage} = require ("../controllers/galerie.controllers.js")
const {authorisation} = require("../controllers/auth.controllers")
const {getGalerieValidator,createGalerieValidator,updateGalerieValidator,deleteGalerieValidator} = require("../utils/validator/galerieValidator")


router.get("/",getPhotos);
router.post("/",authorisation("admin"),uploadGalerieImage,resizeImage,createGalerieValidator,createPhoto);
router.get("/:id",getGalerieValidator,getPhoto);
router.put("/:id",authorisation("admin"),uploadGalerieImage,resizeImage,updateGalerieValidator,updatePhoto);
router.delete("/:id",authorisation("admin"),deleteGalerieValidator,deletePhoto);

module.exports = router;
