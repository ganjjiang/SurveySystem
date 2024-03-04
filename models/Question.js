const mongoose = require("mongoose");


const Question = new mongoose.Schema({
    surveyNo: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Survey'
    },
    question: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Question", Question);