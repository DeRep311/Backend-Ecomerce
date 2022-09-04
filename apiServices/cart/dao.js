const File = require('./../../Services/FS/MFS')
const DB = new File('./../../Services/FS/cartDB.txt');

async function ReadCart(id){
        return DB.getById(id)
}

async function WriteCart(data){
    DB.save(data);
    return console.log("Write done");
}

async function DeleteCartById(id) {
    DB.deleteById(id);

    return console.log(`Delete Cart ID:${id}, done`);
}


async function DeleteProductCart(id) {
    await DB.getById().then(res=>{
        if (res.Product==null) {
            console.log("Este carrito no tiene productos");
        }else{
        res.Product="";
        DB.ModifyById(id,res)}
    })
}
async function AddProducts(idCart,Produ){
   
    await DB.getById(idCart).then(res=>{
        const data= JSON.parse(res,null, 2)
        data['Productos']= Produ;
    })
}
