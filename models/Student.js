const mongoose = require("mongoose");


const Student = new mongoose.Schema({
    //아이디
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    //비밀번호
    password: {
        type: String,
        required: true
    },
    //이름
    name: {
        type: String,
        required: true
    },
    //연락처
    phone: {
        type: String
    },
    //담당 관리자
    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],
});

module.exports = mongoose.model("Student", Student);
