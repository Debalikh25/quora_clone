const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },

    question : {
        type : String,
        required : true
    },

    answers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'answer'
        }
    ]

}, {
    timestamps : true
})

const Question  = mongoose.model('question' , questionSchema);

module.exports = Question