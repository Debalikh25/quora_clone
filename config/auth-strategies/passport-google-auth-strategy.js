const passport  = require('passport');
const User = require("../../models/User")
const GoogleAuthPassport = require('passport-google-oauth20')
const crypto  = require('crypto')


passport.use(new GoogleAuthPassport({
     clientID : '767937987029-vh3ht7456tqdek7sjsi2e7m9f14a082h.apps.googleusercontent.com',
     clientSecret : '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',
     callbackURL : 'http://localhost:7000/users/auth/google/callback'
},

 async (accessId , refreshToken , profile , done)=>{
       try{

        const user = await User.findOne({email : profile.emails[0].value})
        
        if(user){
            return done(null , user)
        }
        
        const newUser = await User.create({
            name : profile.displayName,
            email : profile.emails[0].value,
            password : crypto.randomBytes(20).toString('hex')
        })
        
         return done(null ,newUser)

       }
       catch(err){
        console.log(err)
          return done(err)
       }
 }

))


module.exports = passport