const CRUD= require('./../../Services/Mongo/MongoDB');
const DB = new CRUD(1);
module.exports={
   async GetAll(){
       try {
           const valor=await DB.Read("All")
           return valor;
       } catch (error) {
           console.log(error);
       }
   },
async ReadProdu(id){
      try {
       const valor =await DB.Read(id);
       return valor;
      } catch (error) {
       console.log("no se encuentra el producto");
      }
},
 
async WriteProdu(data){
   try {
       await DB.Create(data)
       return console.log(`done`);
   } catch (error) {
       console.log(error);
   }
},
 
async DeleteProduById(id) {
   try {
       await DB.Delete(id)
  
       return console.log(`Delete Produ ID:${id}, done`);
   } catch (error) {
       console.log("No se encuentra la id");
   }
},
 
async ModifyProduct(id ,data){
   try {
       await DB.Update(id, data);
       console.log("Melo");
   } catch (error) {
       console.log("No se encuentra la id o la informacion no esta correcta");
   }
}
 
 
 
 
 
}
