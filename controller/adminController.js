const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

//@desc view Admin manage student form (bascially admin first page)
//@route GET /admin/adminStudentManage
const adminStudentManageForm = asyncHandler(async (req, res) => {
    //console.log("로그인 여부 : " + req.isAuthenticated());
    //수강생들의 이름 정보만 가져오기
    //console.log(`아이디 조회 ${req.user._id}`);
    const adminId = req.user._id;
    const adminName = req.user.name;
    //관리자 Id를 참조하는 학생들 전부 찾아와 담기
    const students = await Student.find({
        admin: adminId
    });

    //console.log(students[0]);

    //첫 화면에 보여질 학생 정보 
    const first = students[0];

    res.render("adminStudentManage", { isLoggedIn: req.isAuthenticated(), students: students, first: first, adminName: adminName });
});

//@desc read one student info
//@route post /admin/readOneStudent
const readOneStudent = asyncHandler(async (req, res) => {
    //console.log(`아이디가 왔는교 ${req.body.studentId}`);
    const studentId = req.body.studentId;

    const student = await Student.findById(studentId);

    res.send(student);
})

//@desc view admin survey status form
//@route get /admin/adminSurveyStatus
const adminSurveyStatusForm = (req, res) => {
    const adminName = req.user.name;
    res.render("adminSurveyStatus", { isLoggedIn: req.isAuthenticated(), adminName: adminName });
}

//@desc view admin create survey form
//@route get /admin/adminCreateSurvey
const adminCreateSurveyForm = (req, res) => {
    const adminName = req.user.name;
    res.render("adminCreateSurvey", { isLoggedIn: req.isAuthenticated(), adminName: adminName });
}


module.exports = {
    adminStudentManageForm,
    readOneStudent,
    adminSurveyStatusForm,
    adminCreateSurveyForm
};
