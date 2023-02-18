const express = require("express");
const router = express.Router();


const {getPlats,getPlat,createPlat,updatePlat,deleteplat,uploadGalerieImage,resizeImage} = require ("../controllers/plats.controllers")
const {authorisation} = require("../controllers/auth.controllers")
const {getCarteValidator,createCarteValidator,updateCarteValidator,deleteCarteValidator} = require("../utils/validator/carteValidator")



router.get("/",getPlats);
router.post("/",authorisation("admin"),uploadGalerieImage,resizeImage,createPlat);
router.get("/:id",getCarteValidator,getPlat);
router.put("/:id",authorisation("admin"),uploadGalerieImage,resizeImage,updatePlat);
router.delete("/:id",authorisation("admin"),deleteCarteValidator,deleteplat);

module.exports = router;
