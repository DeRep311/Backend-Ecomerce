const mongoose= require('mongoose')
const Schema= mongoose.Schema;
try {
 // Connect to the MongoDB cluster
 mongoose.connect(
  'mongodb+srv://DeRep:nose1234@cluster0.dc3f8gz.mongodb.net/test',
   { useNewUrlParser: false, useUnifiedTopology: false },
   () => console.log(" Mongoose is connected")
 );
 
} catch (e) {
 console.log("could not connect");
}
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

 
exports.Produ= mongoose.model('Produ', schem);
exports.Cart= mongoose.model('cart', schemBuy);
 
