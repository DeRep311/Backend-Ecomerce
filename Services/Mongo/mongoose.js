const mongoose= require('mongoose')
const Schema= mongoose.Schema;
try {
 // Connect to the MongoDB cluster
 mongoose.connect(
  'mongodb+srv://DeRep:nose1234@cluster0.dc3f8gz.mongodb.net/test',
   { useNewUrlParser: true, useUnifiedTopology: true },
   () => console.log(" Mongoose is connected")
 );
 
} catch (e) {
 console.log("could not connect");
}
const schem = new Schema({
 
 Nombre: {
   type: String,
   required: true
 },
 Descripcion: {
   type: String,
   required: true
 
 },
 Codigo: {
   type: Number,
   required: true
 },
 Foto: {
   type: String,
   required: true
 },
 Precio: {
   type: Number,
   required: true,
   min: 0
 
 },
 Stock: {
   type: Number,
   required: true,
   min: 0
 }
 
 
})
 
const schemBuy = new Schema({
 
 Fecha: {
   type: Date,
   required: true
 },
 Productos: {
   type: schem,
   required: true
 }
 
 
})
const BaseProd = mongoose.model('Produ', schem);
const BaseCart = mongoose.model('cart', schemBuy);
 
module.exports= mongoose.model('Produ', schem);
