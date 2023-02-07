const passport = require("passport")
const jwt = require('jsonwebtoken')
const { Registro, datauser } = require("../apiServices/User/Model")
const log = require("winston")



module.exports = {
    //Est middleware es muy similar al anterior pero la diferencia que es un midlleware bloqueante ya que el otro 
    //solo verifica una conexion, este obliga a iniciar sesion (por ej cuando se quiere comprar o ver el perfil)
    async isAutenticated(req, res, next) {
        try {
            if (req.session.Status.Validate) {

                const decoded = jwt.verify(req.session.Status.Token, process.env.SECRET)
                req.UserId = decoded.id
                const User = await datauser(req.UserId)
                req.session.User = {
                    Email: User.Email,
                    Name: User.Name,
                    type: User.type ?'User'  : 'admin'
                }
                return next()

            }
            req.Status.Message = 'Need have account and signin'
            res.redirect('/signin')
        } catch (error) {
            log.error(error.stack)
            res.redirect('/signin')
        }
    },


} 