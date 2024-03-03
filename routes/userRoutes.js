const express = require("express");
const router = express.Router();
const { studnetLoginForm, adminLoginForm, adminSignUpForm, studentSignUpForm, adminSignUp, selectAllAdmin, readOneAdmin, readOneStudent, studentSignUp } = require("../controller/userController");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");


router.get("/studentLogin", isNotLoggedIn, studnetLoginForm);

router.get("/adminLogin", isNotLoggedIn, adminLoginForm);

router.get("/adminSignUp", isNotLoggedIn, adminSignUpForm);

router.get("/studentSignUp", isNotLoggedIn, studentSignUpForm);

router.get("/selectAdmin", isNotLoggedIn, selectAllAdmin);

router.post("/readOneAdmin", isNotLoggedIn, readOneAdmin);

router.post("/readOneStudentId", isNotLoggedIn, readOneStudent);


module.exports = router;
