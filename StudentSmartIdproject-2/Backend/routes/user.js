const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");


router.post("/register",userController.register);
router.get("/verify-email",userController.verify);
router.post("/login",userController.login);
router.get("/refresh",userController.refreshRoute);
router.get("/logout",userController.logout);
router.get("/me",userController.getMe)
module.exports = router;