const { Register, SingIn } = require("./Model")
const passport = require('passport')
const { Informacion } = require("./DTO")

const LogOut= (req, res)=>{
        
    req.logout()
    res.redirect('/api/singin')
}
const Singup= Register
const SingupGet= (req,res)=>{
    res.send(req.app.locals.signup)
    }
const Signin= passport.authenticate(('local-signin'),{
    successRedirect:'/api/profile',
    failureRedirect:'/api/signin',
    passReqToCallback: true
})

const signinGet= (req, res)=>{
    res.send('Inicie sesion')
}
const profile= async (req, res)=>{
   data=await Informacion(req.user)
    res.send(data)
}
module.exports= {
    LogOut,
    Singup,
    Signin,
    SingupGet,
    signinGet,
   profile
}

