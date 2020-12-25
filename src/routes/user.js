const express = require("express");
const { verifyToken } = require("../Middleware/verifyAuth");
const { getUserLogin } = require("../controllers/userController");
const route = express.Router();

route.get("/",[verifyToken],getUserLogin);


module.exports  = route;