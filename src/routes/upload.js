import express from "express";
import {postUploadImage} from "../controllers/uploadController";
import { verifyToken } from "../Middleware/verifyAuth";
import { preUploadImage } from "../Middleware/upload";
const route = express.Router();

route.post("/image",
[verifyToken,preUploadImage],
postUploadImage)

module.exports = route;