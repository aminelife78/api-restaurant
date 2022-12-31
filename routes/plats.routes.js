const express = require("express");
const router = express.Router();


const {getPlats,getPlat,createPlat,updatePlat,deleteplat,platUploadImage} = require ("../controllers/plats.controllers")
const {authorisation} = require("../controllers/auth.controllers")



router.get("/",getPlats);
router.post("/",platUploadImage,createPlat);
router.get("/:id",getPlat);
router.put("/:id",updatePlat);
router.delete("/:id",deleteplat);

module.exports = router;
