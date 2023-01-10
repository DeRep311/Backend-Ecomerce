const File = require('./../../Services/FS/MFS')
const DB = new File('./Services/FS/ProductBD.txt');

module.exports={
    async GetAll(){
        try {
            const valor=await DB.getAll()
            return valor;
        } catch (error) {
            console.log(error);
        }
    },
async  ReadProdu(id){
       try {
        const valor =DB.getById(id)
        return valor;
       } catch (error) {
        console.log("no se encuentra el producto");
       }
},

async WriteProdu(data){
    try {
        await DB.save(data);
        return console.log("Write done");
    } catch (error) {
        console.log(error);
    }
},

async DeleteProduById(id) {
    try {
        DB.deleteById(id);
    
        return console.log(`Delete Produ ID:${id}, done`);
    } catch (error) {
        console.log("No se encuentra la id");
    }
},

async ModifyProduct(id ,data){
    try {
        await DB.ModifyById(id, data);
        console.log("Melo");
    } catch (error) {
        console.log("No se encuentra la id o la informacion no esta correcta");
    }
}





}