const fs = require('./dao')
module.exports = {
     async newCart(data) {
          try {
               await fs.WriteCart(data)
          } catch (error) {
               console.log(error);

          }
     },
     async deleteCart(id) {
          try {
               await fs.DeleteCartById(id)
          } catch (error) {
               console.log(error);
          }
     },
     async getProduCart(id) {
          try {
          const valor =await fs.ReadProductCart(id)
          return valor
          } catch (error) {
               console.log(error);
          }
     },
     async addProduCart(id, produ) {
          try {

               await fs.AddProducts(id, produ)


          } catch (error) {
               console.log(error);
          }

     },
     async DeleteProdu(id, idProdu) {
          try {
               await fs.DeleteProductCart(id, idProdu)
          } catch (error) {
               console.log(error);
          }
     },
     async AllCarts() {
          const valor= await fs.ReadAllCart()
          return valor
     }


}