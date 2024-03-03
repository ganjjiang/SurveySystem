const express = require("express");
const router = express.Router();
const { studentCheckPasswordForm, studentCheckPassword, FindAllAdmin, readOneAdmin, updateStudentInfo } = require("../controller/studentController");
const { isLoggedIn } = require("./middlewares");




router.get("/studentCheckPassword", isLoggedIn, studentCheckPasswordForm);

router.post("/studentCheckPassword", isLoggedIn, studentCheckPassword);

router.get("/findAllAdmin", isLoggedIn, FindAllAdmin);

router.post("/readOneAdmin", isLoggedIn, readOneAdmin);

router.put("/:id", isLoggedIn, updateStudentInfo);

module.exports = router;