const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

//@desc view student Check Password Form (bascially student page)
//@route GET /student/studentCheckPassword

const studentCheckPasswordForm = (req, res) => {

    console.log("로그인 여부 : " + req.isAuthenticated());
    res.render("studentCheckPassword", { isLoggedIn: req.isAuthenticated() });
}

//@desc student Check Password
//@route POST /student/studentCheckPassword

const studentCheckPassword = asyncHandler(async (req, res) => {
    const studentPassword = req.body.password;
    console.log(`비번 확인 : ${studentPassword}`);
    //console.log(`객체 확인 : ${req.user}`);
    const hash = await bcrypt.hash(studentPassword, 12);
    console.log(`해쉬 확인 : ${hash}`);
    console.log(`비번 확인 --0 : ${req.user.password}`);
    // const result = bcrypt.compare(req.user.password, hash);
    // console.log(`아니 이게 맞는지 안맞는지 비교를 안해 ${result}`);
    if (bcrypt.compare(req.user.password, hash)) {
        const adminId = req.user.admin;
        console.log(`관리자 아이디 : ${adminId}`);
        const admin = await Admin.findById(adminId);
        console.log(`관리자 확인 : ${admin}`);
        res.render("studentUpdateInfo", { student: req.user, isLoggedIn: req.isAuthenticated(), admin: admin });
    } else {
        res.redirect("studentCheckPassword");
    }

});

//@desc find All admin
//@route GET /student/FindAllAdmin

const FindAllAdmin = asyncHandler(async (req, res) => {
    const admins = await Admin.find();
    //console.log(`볼라구요 리스트가 오는지 : ${admins}`);
    res.send(admins);
})

//@desc find one admin
//@route POST /student/readOneAdmin
const readOneAdmin = asyncHandler(async (req, res) => {
    const adminId = req.body.adminId;
    const admins = await Admin.findById(adminId);
    res.send(admins);
})

//@desc updatae one student Inf0
//@route POST /student/:_id
const updateStudentInfo = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const notHashedPassword = req.body.password;
    console.log("보자" + JSON.stringify(req.body));
    const hashedPassword = await bcrypt.hash(notHashedPassword, 12);
    console.log("바뀐 비밀번호" + hashedPassword);
    const { password, phone, admin } = req.body;
    const updatedStudentInfo = await Student.findByIdAndUpdate(
        id,
        {
            password: hashedPassword,
            phone: req.body.phone,
            admin: req.body.admin
        },
        { new: true, runValidators: true }
    );


    res.redirect("studentCheckPassword");


})

module.exports = {
    studentCheckPasswordForm,
    studentCheckPassword,
    FindAllAdmin,
    readOneAdmin,
    updateStudentInfo
};

