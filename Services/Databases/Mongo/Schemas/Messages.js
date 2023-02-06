const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const messages = new Schema({
    Fecha:{
        type:String,
        default: new Date().toLocaleTimeString()
        
    },
    Mensajes: {
        type: String,
        required: true
    },
        email: {
            type: String,
            required: true
        },
        tipo:{
            type: String,
            required: true
        }
   
    
},{
    timestamps: false,
    versionKey: false
})
module.exports= mongoose.model('messages',messages);