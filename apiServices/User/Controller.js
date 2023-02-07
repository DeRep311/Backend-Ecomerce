const path = require('path');
const { Registro, Login, datauser } = require("./Model");

const LogOut = (req, res) => {
    req.session.Status = { Validate: false, Message: undefined, Token: undefined }
    req.UserId = undefined
    res.redirect('/')
}
const Singup = async (req, res, next) => {
    const { body } = req
    const status = await Registro(body)
    console.log(status);
    if (!status.Validate) {
        res.render('pages/RegisterOkay', { status: status.Validate, Message: status.message })

    } else {
        req.session.Status = status
        res.render('pages/RegisterOkay', { status: status.Validate, Message: status.message })

    }
}
const SingupGet = (req, res) => {
    //validacion de el estado de conexion (por defecto va ser false ya que para el usuario logeado no esta disponible la opcion de registrarse)
    res.render('Pages/Register', { status: req.session.Status.Validate })
}
const Signin = async (req, res) => {
    //verifica la session para no logearse nuevamente sin sentido
    if (req.session.Status.Validate) {
        res.render('Pages/LoginStatus', { status: true, Message: 'Usted ya esta logeado' })
    } else {
        const { user, pass } = req.body
        const status = await Login(user, pass)
        //revisa si es valido el inicio de session si ya existe el correo, o el usuario
        if (status.Validate) {
            //si es true le da la validacion
            req.session.Status = status
            res.render('Pages/LoginStatus', { status: status.Validate, Message: status.message })

        } else {
            // sino le muestra cual fue el error
            res.render('Pages/LoginStatus', { status: status.Validate, Message: status.message })

        }
    }

}

const signinGet = (req, res) => {
    var confirm
    //Verifica si tiene validacion del token
    req.UserId ? confirm = true : confirm = false
    res.render('Pages/Login', { status: confirm })
}
const profile = async (req, res, next) => {
   
    const User = await datauser(req.UserId)
    res.render('Pages/Profile',{
        Username: User.Username,
        Name: User.Name,
        prefij: User.prefij,
        status: true
    })
}
const websockets = (req, res) => {
    res.sendFile(path.join(__dirname, '../../Public/Chat/index.html'));
}
const home = (req, res) => {
    var confirm
    //Verifica si tiene validacion del token ya decodificado
    req.UserId ? confirm = true : confirm = false
    res.render('Pages/Home', { status: confirm })
}

module.exports = {
    LogOut,
    Singup,
    Signin,
    SingupGet,
    signinGet,
    profile,
    websockets,
    home

}

