/*
La logica del inicio de sesion esta echa sin passport por cuestiones de control, sin contar que al no 
hacer login con twitter o google no tenia sentido tenerlo, por eso hice la logica en la capa model solicitando 
peticiones a la base con su correspondiente DAO
 */

const jwt = require('jsonwebtoken')
const log = require('winston');
const { enviomail } = require('../../Services/Contact/nodmailer');
const { VerifyMailYUser, SaveUser, LoginVerify, deSerializer } = require('./DAO');




const Registro = async (data) => {

    try {
        const validate = await VerifyMailYUser(data.email, data.username)
        console.log(validate);
    
        if (!validate) {
            const user = await SaveUser(data)
            console.log(user);
          const token =  jwt.sign({id:user._id}, process.env.SECRET,{
            expiresIn: 3600 //60 min
           })
           const email= await enviomail(data);
           return {Validate: true, Token: token}
        } else {
            
          
            return {Validate: false, message: validate}
        }
    } catch (error) {
        console.log(error);
    }
}

const Login = async (username, password)=>{
    try {

        const User = await LoginVerify(username, password)
        if (!User.Validate) {
            log.warn(User.message)
            return User
        }
        const token =   jwt.sign({id:User.ID}, process.env.SECRET,{
            expiresIn: 3600 //60 min
           })
        return  {Validate: true, message:'User registred',Token: token}
    } catch (error) {
        log.error(error);
    }
}

const datauser= async(id)=>{
    const data= await deSerializer(id)
    return data
}
module.exports={
Registro,
Login,
datauser
}