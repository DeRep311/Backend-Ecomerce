const express = require('express')
const { isAutenticated } = require('../../middleware/Auth')
const { Singin, LogOut, profile, Singup, SingupGet, signinGet } = require('./Controller')
const passport = require('passport')

const router = express.Router()



    //registro
    router.get('/singup', SingupGet)
    router.post('/singup', Singup)
    //Inicio de sesion
    router.post('/signin', passport.authenticate(('local-signin'),{
        successRedirect:'/profile',
        failureRedirect:'/signin',
        passReqToCallback: true
    }))
    router.get('/signin', signinGet)
    
    //LogOut
    router.get('/logout', isAutenticated, LogOut)

    router.get('/profile', isAutenticated, profile)

    module.exports=router;
