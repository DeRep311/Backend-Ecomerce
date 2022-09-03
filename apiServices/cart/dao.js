const File = require('./../../Services/FS/MFS')

const DBP = new File('./../../Services/FS/ProductDB.txt')
const DB = new File('./../../Services/FS/cartDB.txt');

async function SaveCart(data){
        DB.save(data)
}

async function ModifyCart(data){

}

async function DeleteAllCart(data) {
    DB.deleteById(data);
}

async function DeleteProductCart(params) {
    
}
async function AddProducts(id){

    const Produ= DBP.getById(id)
    //falta informacion sobre la ruta
}
