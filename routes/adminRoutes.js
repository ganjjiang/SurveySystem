const express = require("express");
const router = express.Router();
const { adminStudentManageForm, readOneStudent } = require("../controller/adminController");
const isLoggedIn = require("./middlewares");

router.route("/adminStudentManage", isLoggedIn).get(adminStudentManageForm);

router.route("/readOneStudent", isLoggedIn).post(readOneStudent);

module.exports = router;