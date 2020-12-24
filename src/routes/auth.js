import express from "express";
import { register, login, forgot, reset } from "../controllers/authController";
import {registerValidationRules, 
    validate, 
    emailExists, 
    usernameExists, 
    loginValidationRules,
    forgotCheckEmail, 
    resetPasswordValidationRules
} from "../Middleware/validate"
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