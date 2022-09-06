const File = require('./../../Services/FS/MFS')
const DB = new File('./../../Services/FS/ProductDB.txt');

module.exports={
async  ReadProdu(id){
       try {
            DB.getById(id).then(res=>{
                return res
            })
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
        await DB.ModifyProduct(id, data);
    } catch (error) {
        console.log("No se encuentra la id o la informacion no esta correcta");
    }
}





}