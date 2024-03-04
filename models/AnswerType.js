const mongoose = require("mongoose");

const AnswerType = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Question'
    },
    answerType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("AnswerType", AnswerType);