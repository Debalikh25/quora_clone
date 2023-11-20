
module.exports.setLoggedInUser = (req,res,next)=>{

    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}



module.exports.checkAuthentication= (req,res,next)=>{

    if(!req.isAuthenticated()){
       return res.redirect('/')
    }

    next();
}
