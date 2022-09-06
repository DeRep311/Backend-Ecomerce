const fsP = require('./dao')
module.exports ={
    async newProdu(data){
         try {
              await fsP.WriteProdu(data)
         } catch (error) {
             console.log(error);
            
         }
    },
    async deleteProdu(id){
       try {
            await fsP.DeleteProduById(id)
       } catch (error) {
        console.log(error);
       }
    },
    async getProdu(id){
           try {
                await fsP.ReadProdu(id)
           } catch (error) {
            console.log(error);
           }
    },
    async ModProdu(id, data){
       try {
            await fsP.ModifyProduct(id, data)
       } catch (error) {
           
       }
    }
    
    
}