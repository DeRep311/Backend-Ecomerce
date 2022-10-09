const fsP = require('./daoM')
module.exports = {
     async newProdu(data) {
          try {
               await fsP.WriteProdu(data)
          } catch (error) {
               console.log(error);

          }
     },
     async deleteProdu(id) {
          try {
               await fsP.DeleteProduById(id)
          } catch (error) {
               console.log(error);
          }
     },
     async getProdu(id) {
          try {
               const valor = await fsP.ReadProdu(id)
               return valor
          } catch (error) {
               console.log(error);
          }
     },
     async getAllProdu() {
          try {
               const valor = await fsP.GetAll()
               return valor;
          } catch (error) {
               console.log(error);
          }
     },

     async ModProdu(id, data) {
          try {
               await fsP.ModifyProduct(id, data)
          } catch (error) {

          }
     }


}