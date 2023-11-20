const User = require("../models/User");
const Question = require("../models/Question");
//Use Case -> Renders Home Page With Login and Sign Up
module.exports.home = (req, res) => {

  if(req.isAuthenticated()) {
      return res.redirect('/users/timeline')
  }
  return res.render("home", {
    title: "Quora Home",
  });
};

//Use Case -> Renders Sign Up Page
module.exports.signUpPage = (req, res) => {

  if(req.isAuthenticated()) {
    return res.redirect('/users/timeline')
}

  return res.render("users-sign-up", {
    title: "Quora Sign Up",
  });
};

//Use Case -> Register a user manually using form.
module.exports.signUpManual = async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    

    const user = await User.findOne({ email: email });
    if (user) {
      console.log("User already registered");
      return res.redirect("back");
    }

    if (password != cpassword) {
      console.log("Passwords do not match");
      return res.redirect("back");
    }

    await User.create({
      name,
      email,
      password,
    });

    return res.redirect("back");
  } catch (err) {
    console.log("Error occured: " + err);
    return res.redirect("back");
  }
};

//Use Case -> Manual Login Authentication done by passport local middleware
module.exports.login = (req,res)=>{
   return res.redirect("/users/timeline")
}

//Use Case -> Renders the timeline page. First filtered by a middleware to check authentication
module.exports.timeLinePage = (req, res)=>{
      return res.render('timeline' , {
        title : 'Quora Timeline'
      })
}

//Use Case -> Renders the profile page of the user. First filtered by a middleware to check authentication
module.exports.profilePage = async (req, res)=>{
  try{

     const user = await User.findById(req.params.id);
     if(!user){
      return res.redirect('back');
     }

     const questions = await Question.find({user : req.user._id})
     questions = questions.reverse();

    return res.render('profile' , {
      title : 'Quora Profile',
      user : user,
      questions : questions
    })
  }
  catch(err){

  }
 
}


//function to logout user and destroy session
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
     return next(err);
    }
    res.redirect("/");
  });
};
