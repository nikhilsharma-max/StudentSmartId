const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

router.use("",( req, res, next ) => {
    console.log("User route accessed");
    next();
});
router.post("/register",userController.register);
router.get("/verify-email",userController.verify);

module.exports = router;