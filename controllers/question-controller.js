const User = require("../models/User");
const Question  = require("../models/Question")

//Use Case -> A user creates a question
module.exports.createQuestion = async(req,res)=>{

    try{
        const user = req.user; 
        
        await Question.create({
            user : user,
            question : req.body.question,
            answers : []
        })

        return res.redirect("back")

    }
    catch(err){
       return res.redirect("back");
    }

}