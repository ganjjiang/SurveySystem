const express = require("express");
const router = express.Router();
const { adminStudentManageForm, readOneStudent, adminSurveyStatusForm, adminCreateSurveyForm } = require("../controller/adminController");
const isLoggedIn = require("./middlewares");

router.route("/adminStudentManage", isLoggedIn).get(adminStudentManageForm);

router.route("/readOneStudent", isLoggedIn).post(readOneStudent);

router.route("/adminSurveyStatus", isLoggedIn).get(adminSurveyStatusForm);

router.route("/adminCreateSurvey", isLoggedIn).get(adminCreateSurveyForm);
module.exports = router;