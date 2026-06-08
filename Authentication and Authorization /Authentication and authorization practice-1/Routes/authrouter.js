const mongoose = require("mongoose");
const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.js");


authRouter.post("/register",authController.postUser)
authRouter.get("/get-me",authController.getMe);
authRouter.get("/refresh-token",authController.refreshToken);
authRouter.get("/logout",authController.logout);
authRouter.get("/logout-all",authController.logoutAll);
authRouter.post("/login",authController.login);
module.exports = authRouter;
