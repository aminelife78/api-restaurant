const express = require("express");
const router = express.Router();

const {getPhotos,getPhoto,createPhoto,updatePhoto,deletePhoto,galerieUploadImage} = require ("../controllers/galerie.controllers.js")
const {authorisation} = require("../controllers/auth.controllers")


router.get("/",getPhotos);
router.post("/",authorisation("admin"),galerieUploadImage,createPhoto);
router.get("/:id",getPhoto);
router.post("/:id",authorisation("admin"),updatePhoto);
router.delete("/:id",authorisation("admin"),deletePhoto);

module.exports = router;
