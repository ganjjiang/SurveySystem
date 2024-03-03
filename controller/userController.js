const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

//@desc view Login form (bascially student login form )
//@route GET /user/studentLogin

const studnetLoginForm = (req, res) => {
    res.render("studentLogin");
}

//@desc view admin Login form
//@route GET /user/adminLogin

const adminLoginForm = (req, res) => {
    res.render("adminLogin");
}

//@desc view admin SignUp form
//@route GET /user/adminSignUp

const adminSignUpForm = (req, res) => {
    res.render("adminSignUp");
}

//@desc view student SignUp form
//@route GET /user/studentSignUp

const studentSignUpForm = (req, res) => {
    res.render("studentSignUp");
}


//@desc select admin List
//@route GET /user/selectAdmin
const selectAllAdmin = asyncHandler(async (req, res) => {
    const admins = await Admin.find();
    //console.log(admins);
    res.send(admins);
});

//@desc read one admin
//@route POST /user/readOneAdmin
const readOneAdmin = asyncHandler(async (req, res) => {
    //console.log("이거는?" + req.body.adminId);
    const adminId = req.body.adminId;
    const admins = await Admin.findById(adminId);
    //console.log("아이디가?" + adminId);
    res.send(admins);
})


//@desc read one studentId
//@route POST /user/readOneStudentId
const readOneStudent = asyncHandler(async (req, res) => {
    const studentId = req.body.studentId;
    const students = await Student.find({ userId: studentId });
    //console.log("아이디가?" + studentId);
    //console.log(students);

    res.send(students);
})





module.exports = {
    studnetLoginForm,
    adminLoginForm,
    adminSignUpForm,
    studentSignUpForm,
    selectAllAdmin,
    readOneAdmin,
    readOneStudent
};