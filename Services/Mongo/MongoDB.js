const BaseProd = require("./mongoose");
 
 
 
 
class CRUD {
   constructor(Select) {
    
       if (Select == 1) {
            this.bd = BaseProd;
       } else {
           this.bd = BaseCart;
       }
   }
 
   async Create(param) {
        console.log(param);
       const data = await new this.bd(param)
       data.save().then(data => console.log(data)).catch(err => console.log(err))
   }
 
   async Read(id_nom) {
       const param = typeOf(id_nom)
       let data;
       switch (param) {
           case 'number':
               data = await this.dateb.findById(id_nom)
               return data
              
 
           case 'String':
               data = await this.dateb.findOne({ Nombre: id_nom })
               return data
              
 
           case "undefined":
               console.log("Undefinido");
       }
   }
   async Update(id, params) {
       const param = typeOf(id_nom)
       const option = { new: true }
       const dat = { $set: params }
       let data;
       switch (param) {
           case 'number':
               data = await this.dateb.findByIdAndUpdate(id_nom, dat, option, (err, doc) => {
                   if (err) {
                       console.log("error");
                   } else {
                       return doc
                   }
               })
               return data
 
 
           case 'String':
               data = await this.dateb.findOneAndUpdate({ Nombre: id }, dat, option, (err, doc) => {
                   if (err) {
                       console.log("error");
                   } else {
                       return doc;
                   }
               })
               return data
 
 
           default:
               console.log("Undefinido");
               break;
       }
   }
 
   async Delete(id_nom){
       const param = typeOf(id_nom)
       let data;
       switch (param) {
           case 'number':
               data = await this.dateb.findByIdAndDelete(id_nom,(err)=>{
                   if(err){
                       console.log(err);
                   }
               })
               return "success"
               break;
 
           case 'String':
               data = await this.dateb.findOneAndDelete({ Nombre: id },(err)=>{
                   if(err){
                       console.log(err);
                   }
               })
               return "success"
           case "undefined":
               console.log("Undefinido");
       }
 
   }
}
 
 
 
 
 
module.exports= CRUD