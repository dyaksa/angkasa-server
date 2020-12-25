const express = require("express");
const {postUploadImage} = require("../controllers/uploadController");
const { verifyToken } = require("../Middleware/verifyAuth");
const { preUploadImage } = require("../Middleware/upload");
const route = express.Router();

route.post("/image",
[verifyToken,preUploadImage],
postUploadImage)

module.exports = route;