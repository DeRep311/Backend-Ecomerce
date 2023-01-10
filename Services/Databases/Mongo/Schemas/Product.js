const mongoose= require('mongoose')
const Schema= mongoose.Schema;
const schem = new Schema({
 
    Nombre: {
      type: String,
      required: false
      
    },
    Descripcion: {
      type: String,
      required: false
     
    
    },
    Codigo: {
      type: Number,
      required: false
    
    },
    Foto: {
      type: String,
      required: false
   
    },
    Precio: {
      type: Number,
      required: false,
    
      min: 0
    
    },
    Stock: {
      type: Number,
      required: false,
      
      min: 0
    }
    
    
   })
   const Producto=  mongoose.model('Produ', schem);
   
   module.exports={
    Producto,
    schem
   }
    