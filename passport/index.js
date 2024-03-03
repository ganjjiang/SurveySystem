const passport = require("passport");
const localStudent = require("./localStrategyStudent");
const localAdmin = require("./localStrategyAdmin");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

module.exports = () => {

    passport.serializeUser((user, done) => {
        console.log(`4 - Serialize user : ${JSON.stringify(user)}`);
        //done(null, user.userId);
        done(null, user.adminNum);

    });

    passport.deserializeUser((id, done) => {
        console.log(`6 - Deserialize user : ${id}`);

        // if (id.charAt(0) === "G") {
        Admin.findOne({ "adminNum": id })
            .then(user => {
                done(null, user)
                console.log(`6.5 FindOneUser : ${JSON.stringify(user)}`);
            })
            .catch(err => done(err));

        // } else {

        // Student.findOne({ "userId": id })
        //     .then(user => {
        //         done(null, user)
        //         console.log(`6.5 FindOneUser : ${JSON.stringify(user)}`);
        //     })
        //     .catch(err => done(err));
        // }

    });

    //localStudent();
    localAdmin();
    // passport.deserializeUser((id, done) => {

    //     Admin.findOne({ where: { id } })
    //         .then(user => done(null, user))
    //         .catch(err => done(err));
    // });

    //localStudent();
    //localAdmin();
}

// module.exports = () => {

//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });



//     passport.deserializeUser((id, done) => {

//         Admin.findOne({ where: { id } })
//             .then(user => done(null, user))
//             .catch(err => done(err));
//     });

//     localAdmin();
// }

