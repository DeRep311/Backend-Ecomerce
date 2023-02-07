const log = require('winston')
const { MailBuy } = require('../../Services/Contact/nodmailer')
const { Mensagge } = require('../../Services/Contact/twilio')
const { deSerializer } = require('../User/DAO')
const DB = require("./DAO")
const { productos } = require('./DTO')
module.exports = {
     async newCart() {
          try {
               const carrito = {
                    Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
                    Producto: []
               }
               return carrito
          } catch (error) {
               log.error(error.stack)
               return false


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
               log.error(error.stack);
               return false
          }
     },
     async addProduCart(produ) {
          try {
               const producto = await DB.AddProducts(produ)
               if (producto.Validate) {
                    const ProductExist= producto.Product
                    ProductExist.fechaIngreso = `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
                    return ProductExist
               } else {
                    return false
               }
          } catch (error) {
               log.error(error.stack);
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
               log.error(error.stack);
               return false
          }
     },
     async AllCarts() {
          try {
               const valor = await DB.ReadAllCart()
               return valor
          } catch (error) {
               log.error(error.stack)
          }
     },
     async Allbuy(DataId, cart) {
          const DataUser= await deSerializer(DataId)
          const email = DataUser.Email
          const produ = await productos(cart)
          try {
               const bodywpp = `El pedido es de ${DataUser.Username}, email: ${email}: ${produ}`
               const info= await MailBuy(email, DataUser, produ)
               log.info(info)
               //Se envia un mensaje al administrador (podria ser un repartidor), es funcional pero el servicio no esta contratado por ende espera verificacion desde twilio para enviarlo
               // await Mensagge(bodywpp)
               return true
          } catch (error) {
               log.error(error.stack) 
               return false
          }




     }
} 