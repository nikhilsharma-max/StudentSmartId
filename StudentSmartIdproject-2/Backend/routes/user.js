const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");


router.post("/register",userController.register);
router.get("/verify-email",userController.verify);
router.post("/login",userController.login);
router.get("/refresh",userController.refreshRoute);
router.post("/logout",userController.logout);
module.exports = router;