const log = require('winston')
const jwt = require('jsonwebtoken')

//este middleware solo verifica el status de conexion del usuario
const VerifyStatus = async (req, res, next) => {
  try {
    //En el login creo un objeto dentro de session llamada status que se compone de Validate, Message, Token
    //Validate va verificar si hay un token y si es correcto el mismo 
    if (req.session.Status.Validate) {
      const decoded =  jwt.verify(req.session.Status.Token, process.env.SECRET)
      //Lo guarda en un UserId que simplemente es el ID en mongo, listo para usarse en otras funciones como profile,etc
      req.UserId = decoded.id
      return next()
    } else {
      req.session.Status = { Validate: false, Message: undefined, Token: undefined }
      return next()
    }
  } catch (error) {
//Los errores mas comunes es del token expirado o invalido, por eso no utilizo un log para verlo
    req.session.Status = { Validate: false, Message: undefined, Token: undefined }
    return next()

  }
}

module.exports = {
  VerifyStatus


}