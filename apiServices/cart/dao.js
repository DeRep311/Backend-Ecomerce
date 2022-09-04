const File = require('./../../Services/FS/MFS')
const DB = new File('./../../Services/FS/cartDB.txt');

module.exports={
async  ReadCart(id){
        return DB.getById(id)
},

async WriteCart(data){
    DB.save(data);
    return console.log("Write done");
}

async DeleteCartById(id) {
    DB.deleteById(id);

    return console.log(`Delete Cart ID:${id}, done`);
},


async DeleteProductCart(id) {
    await DB.getById(id).then(res=>{
        if (res.Product==null) {
            console.log("Este carrito no tiene productos");
        }else{
        res.Product="";
        DB.ModifyById(id,res)}
    })
},
async AddProducts(idCart,Produ){
   
    await DB.getById(idCart).then(res=>{
        const data= JSON.parse(res,null, 2)
        data['Productos']= Produ;
    })
},

async ReadProductCart(id) {
    await DB.getById(id).then(res=>{
        if (res.Product==null) {
            console.log("Este carrito no tiene productos");
        }else{
        return res.Product;
        
    }
    })
}

}