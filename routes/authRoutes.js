const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { studentSignUp, adminSignUp, studentLogin, adminLogin, logout } = require("../controller/authController");


router.post("/studentSignUp", isNotLoggedIn, studentSignUp);

router.post("/adminSignUp", isNotLoggedIn, adminSignUp);

router.post("/studentLogin", isNotLoggedIn, studentLogin);

router.post("/adminLogin", isNotLoggedIn, adminLogin);

router.get("/logout", isLoggedIn, logout);

module.exports = router;
