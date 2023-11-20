const express = require('express');
const Router = express.Router();
const questionController = require("../controllers/question-controller")
const middleware = require("../middlewares/middlewares")

Router.post("/create" , middleware.checkAuthentication ,  questionController.createQuestion)

module.exports = Router