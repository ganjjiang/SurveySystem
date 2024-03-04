const mongoose = require("mongoose");

const Survey = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        required: true,
        default: Date.now
    },
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    targetUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model("Survey", Survey);