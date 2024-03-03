const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Student = require("../models/Student");


module.exports = () => {
    passport.use(
        new LocalStrategy({
            usernameField: 'userId',
            passwordField: 'password',
        }, async (userId, password, done) => {
            console.log(`2 - Local strategy verify cb`);
            try {
                const exUser = await Student.findOne({ "userId": userId });
                if (exUser) {
                    const result = await bcrypt.compare(password, exUser.password);
                    if (result) {
                        return done(null, exUser);
                    } else {
                        return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
                    }
                } else {
                    return done(null, false, { message: '가입되지 않은 회원입니다.' });
                }
            } catch (error) {
                console.error(error);
                return done(error);
            }
        },
        ),
    );

};