const router = require('express').Router()

const { VerifyStatus } = require('../../middleware/Status')
const { isAutenticated } = require('../../middleware/Auth')

const { LogOut, profile, Singup, SingupGet, signinGet, websockets, Signin, home, extractData} = require('./Controller')



//home
router.get('/', VerifyStatus, home)
//registro
router.get('/signup', SingupGet)
router.post('/signup', Singup)
//Inicio de sesion
router.post('/signin', VerifyStatus, Signin)
router.get('/signin', signinGet)
//Deslogearse
router.get('/logout', isAutenticated, LogOut)
//Chat global y perfil
router.get('/profile', isAutenticated, profile)
router.get('/chatglobal',isAutenticated, websockets)
router.get('/datauser', extractData)



module.exports = router;
