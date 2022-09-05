const File = require('./../../Services/FS/MFS')
const DB = new File('./../../Services/FS/cartDB.txt');

module.exports={
async  ReadCart(id){
       try {
            DB.getById(id).then(res=>{
                return res
            })
       } catch (error) {
        console.log(error);
       }
},

async WriteCart(data){
    try {
        await DB.save(data);
        return console.log("Write done");
    } catch (error) {
        console.log(error);
    }
},

async DeleteCartById(id) {
    try {
        B.deleteById(id);
    
        return console.log(`Delete Cart ID:${id}, done`);
    } catch (error) {
        console.log(error);
    }
},


async DeleteProductCart(id) {
   try {
        await DB.getById(id).then(res=>{
            if (res.Product==null) {
                console.log("Este carrito no tiene productos");
            }else{
            res.Product="";
            DB.ModifyById(id,res)}
        })
   } catch (error) {
    console.log(error);
   }
},
async AddProducts(idCart,Produ){
   
   try {
        await DB.getById(idCart).then(res=>{
            const data= JSON.parse(res,null, 2)
            data['Productos']= Produ;
        })
   } catch (error) {
       console.log(error);
   }
},

async ReadProductCart(id) {
    try {
        await this.getById(id).then(res=>{
            const data = JSON.parse(res, null, 2)
            console.log(typeof(data));
            if (data.Producto==null) {
                console.log("Este carrito no tiene productos");
            }else{
            data.Producto.forEach(x => {
                return console.log(x);
            });
            
        }
        })
    } catch (error) {
        console.log(error);
    }
},
async DeleteProductCart(id, idProdu) {
    try {
        await this.getById(id).then(res => {
            const data = JSON.parse(res, null, 2)

            if (data.Producto == null) {
                console.log("Este carrito no tiene productos");
            } else {
                const indice = data.Producto.findIndex(elemento=>elemento.id==idProdu)
                data.Producto.splice(indice,1)
                this.ModifyById(id, data)
            }
        })
    } catch (error) {
        console.log(error);
    }

}

}