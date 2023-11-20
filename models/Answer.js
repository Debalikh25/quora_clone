const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({

    user : {
        type : mongoose.Types.Schema.ObjectId,
        ref : 'user'
    },

    answer : {
        type : String,
        required : true
    },

    question : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'question'
    }

} , {
    timestamps : true
});


const Answer = mongoose.model('answer' , answerSchema);

module.exports = Answer;