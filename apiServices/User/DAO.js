const manager = require('../../Services/Databases/Mongo/Manager/UserManager')
const user = new manager()
const log = require('winston')
const { enviomail } = require('../../Services/Contact/nodmailer');
const { Informacion } = require('./DTO');

const VerifyMailYUser = async (email, username) => {
    try {

        let status = await user.Verify({ Email: email })

        if (status) {
            return 'Mail Exist';
        }

        status = await user.Verify({ Username: username })
        if (status) {
            return 'Username Exist';
        }
        return false

    } catch (error) {
        log.error(JSON.stringify(error))
    }
}
const SaveUser = async (data) => {
    try {

        const newuser = await user.Create(data)
      
        return newuser
    } catch (error) {
        log.error(JSON.stringify(error));

    }
}
const LoginVerify = async (User, pass) => {
    try {
        const login = await user.VerifyAndPass(User, pass)
        return login
    } catch (error) {
        log.error(JSON.stringify(error));
    }



}
const deSerializer = async (Id) => {
    const data = await user.id(Id)
    //utilizo el dto para filtrar la contraseña y datos sensibles, asi no salen del servidor a no ser que sea solicitado por algo en especifico
    const dataOkay = await Informacion(data)
    return dataOkay
}

module.exports = {
    VerifyMailYUser,
    SaveUser,
    LoginVerify,
    deSerializer
} 