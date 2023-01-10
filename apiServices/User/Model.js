
const passport = require('passport')
const Register =  passport.authenticate('local-singup', {
    successRedirect:'/profile',
    failureRedirect:'/singup',
    passReqToCallback: true
})
const SingIn=  passport.authenticate(('local-signin'),{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    passReqToCallback: true
})





module.exports= {
    Register,
    SingIn,
   
   
}