import express from "express";
import { verifyToken } from "../Middleware/verifyAuth";
import { getUserLogin } from "../controllers/userController";
const route = express.Router();

route.get("/",[verifyToken],getUserLogin);


module.exports  = route;