const express = require('express');
const Router = express.Router();
const usersController = require("../controllers/users-controller")
const passport = require('passport');
const middleware = require('../middlewares/middlewares')

Router.get("/" ,  usersController.home)
Router.get("/sign-up" , usersController.signUpPage)
Router.post("/sign-up" ,  usersController.signUpManual)
Router.post("/sign-in" , passport.authenticate('local' , {
    failureRedirect : '/'
}) ,  usersController.login)


Router.get("/auth/google" , passport.authenticate('google' ,  {
    scope : ['profile' , 'email'],
  
}))

Router.get("/auth/google/callback" , passport.authenticate('google' , {
    failureRedirect : '/',
}) , usersController.login)

Router.get("/timeline" , middleware.checkAuthentication ,  usersController.timeLinePage)
Router.get("/profile/:id" , middleware.checkAuthentication , usersController.profilePage)
Router.get('/logout' , middleware.checkAuthentication , usersController.logout)

module.exports = Router