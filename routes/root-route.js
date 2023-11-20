const express = require('express');
const Router = express.Router();
const userRouter = require("./user-routes")
const questionRouter = require("./question-routes")

Router.get("/" , (req,res)=>{
    return res.redirect('/users/')
})

Router.use("/users" , userRouter)
Router.use("/question" , questionRouter)

module.exports = Router