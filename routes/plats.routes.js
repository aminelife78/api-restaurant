const express = require("express");
const router = express.Router();


const {getPlats,getPlat,createPlat,updatePlat,deleteplat,platUploadImage} = require ("../controllers/plats.controllers")
const {authorisation} = require("../controllers/auth.controllers")



router.get("/",getPlats);
router.post("/",authorisation("admin"),platUploadImage,createPlat);
router.get("/:id",authorisation("admin"),getPlat);
router.put("/:id",authorisation("admin"),updatePlat);
router.delete("/:id",authorisation("admin"),deleteplat);

module.exports = router;
