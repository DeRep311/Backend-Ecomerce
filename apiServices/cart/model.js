const fs = require('./dao')
const fsP= require('./../product/dao')
module.exports ={
    async newCart(data){
         try {
              await fs.WriteCart(data)
         } catch (error) {
             console.log(error);
            
         }
    },
    async deleteCart(id){
       try {
            await fs.DeleteCartById(id)
       } catch (error) {
        console.log(error);
       }
    },
    async getProduCart(id){
           try {
                await fs.ReadProductCart(id)
           } catch (error) {
            console.log(error);
           }
    },
    async addProduCart(id, idProdu){
          try {
              await fsP.getById(idProdu).then(res=>{
                await fs.AddProducts(id,res)
                
              })
          } catch (error) {
            console.log(error);
          }
            
    },
    async DeleteProdu(id, idProdu){
       try {
            await fs.DeleteProductCart(id,idProdu)
       } catch (error) {
        console.log(error);
       }
    }
    
    
}