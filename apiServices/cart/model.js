const fs = require('./daoM')
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
               
               const retorno = await fs.DeleteProductCart(id, idProdu).then(resu=>{
                    if (resu!==null) {
                         return 1
                    } else {
                         return null
                    }
               })
               return retorno
          } catch (error) {
               console.log(error);
          }
     },
     async AllCarts() {
          const valor= await fs.ReadAllCart()
          return valor
     }


}