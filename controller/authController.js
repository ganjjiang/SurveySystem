const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

//@desc student sign up
//@route POST /auth/studentSignUp

const studentSignUp = asyncHandler(async (req, res, next) => {
    const { userId, password, name, phone, admin } = req.body;

    try {
        const exUser = await Student.findOne({ where: { userId } });
        if (exUser) {
            return res.redirect('/');
        } else {
            console.log("암호화 시작");
            // 정상적인 회원가입 절차면 해시화 
            const hash = await bcrypt.hash(password, 12);
            console.log("암호화 끝");
            await Student.create({
                userId, password: hash, name, phone, admin
            });
            return res.redirect("/user/studentLogin");
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

//@desc admin sign up
//@route POST /auth/studentSignUp
const adminSignUp = asyncHandler(async (req, res, next) => {
    const { name, adminNum, password, phone } = req.body;

    try {
        const exUser = await Admin.findOne({ where: { adminNum } });
        if (exUser) {
            return res.redirect('/studentSignUp?error=exist');
        } else {
            console.log("암호화 시작");
            // 정상적인 회원가입 절차면 해시화 
            const hash = await bcrypt.hash(password, 12);
            console.log("암호화 끝");
            await Admin.create({
                name, adminNum, password: hash, phone
            });
            return res.redirect("/user/adminLogin");
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

//@desc student login
//@route POST /auth/studentLogin
const studentLogin = asyncHandler(async (req, res, next) => {
    console.log(`1 - Login hander ${JSON.stringify(req.body)}`);
    passport.authenticate("local", (authError, user, info) => {
        console.log(`3 - Passport authenticate cb ${JSON.stringify(user)}`);
        if (authError) {
            console.log(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`)
        }
        return req.login(user, (loginError) => {
            console.log(`5 - Login user : ${JSON.stringify(user)}`);
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/student/studentCheckPassword");
        });
    })(req, res, next);
});

//@desc admin login
//@route POST /auth/adminLogin

const adminLogin = asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        console.log(user);
        if (authError) {
            console.log(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/admin/adminStudentManage");
        });
    })(req, res, next);
});

//@desc user logout
//@route POST /auth/logout
const logout = asyncHandler(async (req, res) => {
    req.logOut(err => {
        if (err) {
            return next(err);
        } else {
            console.log('로그아웃됨.');
            res.redirect('/');
        }
    });
});

module.exports = { studentSignUp, adminSignUp, studentLogin, adminLogin, logout };