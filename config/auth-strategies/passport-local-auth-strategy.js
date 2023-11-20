const passport  = require('passport')
const LocalPassportStrategy  = require('passport-local').Strategy
const User = require('../../models/User')


passport.use(new LocalPassportStrategy({
    usernameField : 'email'
} , async (username , password , done)=>{
     try{
         const user = await User.findOne({email : username})
         if(!user){
            return done(null , false)
         }

         if(user.password != password){
            return done(null , false)
         }
         return done(null , user)
     }
     catch(err){
        return done(err)
     }

}))


passport.serializeUser((user,done)=>{
   return done(null , user)
})

passport.deserializeUser(async (user , done)=>{
    
   try{
       
       const user1 =  await User.findOne({email : user.email})

       if(!user1){
        return done(null, false, {message : 'User Not Found!'})
       }
       
       return done(null, user1)
    }

     catch(err){
        return done(err)
     }
   }     
)



module.exports = passport

