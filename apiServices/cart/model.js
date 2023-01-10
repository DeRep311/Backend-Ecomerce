const log = require('winston')
const { genericMail } = require('../../Services/Contact/nodmailer')
const { Mensagge } = require('../../Services/Contact/twilio')
const DB = require("./DAO's/daoM")
const { productos } = require('./DTO')
module.exports = {
     async newCart(data) {
          try {
               const carrito = {
                    Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
                    Producto: []
               }
               return carrito
          } catch (error) {
               log.error(error)
               return false


          }
     },
     async deleteCart(id) {
          try {
               await DB.DeleteCartById(id)
          } catch (error) {
               log.error(error);
          }
     },
     async getProduCart(cart) {
          try {
               const valor = cart.Producto
               if (valor == {}) {
                    return false
               } else {
                    return valor
               }
          } catch (error) {
               log.error(error);
               return false
          }
     },
     async addProduCart(produ) {
          try {
               const producto = await DB.AddProducts(produ)
               if (producto) {
                    producto.fechaIngreso = `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
                    return producto
               } else {
                    return 'no se encuentra el producto'
               }
          } catch (error) {
               log.error(error);
               return false
          }

     },
     async DeleteProdu(id, Produ) {
          try {
               if (typeof id == 'string') {
                    const datos = Produ.Producto.filter(x => x.Nombre !== id)
                    Produ.Producto = datos
                    return Produ
               } else {
                    const datos = Produ.Producto.filter(x => x._id !== id)
                    Produ.Producto = datos
                    return Produ
               }

          } catch (error) {
               log.error(error);
               return false
          }
     },
     async AllCarts() {
          try {
               const valor = await DB.ReadAllCart()
               return valor
          } catch (error) {
               console.log(error);
               log.error(error)
          }
     },
     async Allbuy(DataUser, cart) {
          const email = DataUser.Email
          const produ = await productos(cart)
          try {
               const bodywpp = `El pedido es de ${DataUser.Username}, email: ${email}: ${produ}`
               const info= await genericMail(email, DataUser, produ)
               log.info(info)
               await Mensagge(bodywpp)
          } catch (error) {
               log.error(error) 
          }




     }
} 