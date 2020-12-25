const express = require("express");
const { register, login, forgot, reset } = require("../controllers/authController");
const {registerValidationRules, 
    validate, 
    emailExists, 
    usernameExists, 
    loginValidationRules,
    forgotCheckEmail, 
    resetPasswordValidationRules
} = require("../Middleware/validate");
const route = express.Router();

route.post("/register",
[registerValidationRules(),validate, emailExists, usernameExists],
register);

route.post("/login",
[loginValidationRules(), validate],
login);

route.post("/forgot",
[forgotCheckEmail(), validate],
forgot);

route.patch("/reset/:id",
[resetPasswordValidationRules(), validate],
reset);

module.exports = route;