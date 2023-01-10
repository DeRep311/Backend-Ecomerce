const mongoose= require('mongoose');
const {schem} = require('./Product');
const Schema= mongoose.Schema;

const schemBuy = new Schema({
 
    Fecha: {
      type: Date,
      required: false
    },
    Productos: {
      type: schem,
      required: false,
      default:{}
    }
    
    
   })
   module.exports= mongoose.model('cart', schemBuy);