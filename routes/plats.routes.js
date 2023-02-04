const express = require("express");
const router = express.Router();


const {getPlats,getPlat,createPlat,updatePlat,deleteplat,platUploadImage} = require ("../controllers/plats.controllers")
const {authorisation} = require("../controllers/auth.controllers")



router.get("/",getPlats);
router.post("/",platUploadImage,authorisation("admin"),createPlat);
router.get("/:id",getPlat);
router.put("/:id",platUploadImage,authorisation("admin"),updatePlat);
router.delete("/:id",authorisation("admin"),deleteplat);

module.exports = router;
