const File = require('./../../Services/FS/MFS')
const DB = new File('./Services/FS/cartDB.txt');

module.exports={
    async ReadAllCart(){
       try {
            const valor = await DB.getAll()
            return valor
       } catch (error) {
           console.log(error);
       }
    },
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
        DB.deleteById(id);
    
        return console.log(`Delete Cart ID:${id}, done`);
    } catch (error) {
        console.log(error);
    }
},


async DeleteProductCart(id) {
   try {
       const valor= await DB.getById(id)
            if (valor.Product==null) {
                console.log("Este carrito no tiene productos");
            }else{
            valor.Product="";
            DB.ModifyById(id,valor)}
        
   } catch (error) {
    console.log(error);
   }
},
async AddProducts(idCart,Produ){
   
   try {
        await DB.getById(idCart).then(res=>{
            const data= res
            if (data.Productos.length === 0) {

                newId = 1;

            } else {

                newId = data.Productos[data.Productos.length - 1].id + 1;

            }
            datosFinally={...Produ, id:newId}
            data.Productos.push(datosFinally)
            DB.ModifyById(idCart,data);
        })
   } catch (error) {
       console.log(error);
   }
},

async ReadProductCart(id) {
    try {
        const data = await DB.getById(id)
            
            console.log(data.Productos);
            
            if (data.Productos.length==0) {
                console.log("Este carrito no tiene productos");
                return null
            }else{
                const valor=[]
            data.Productos.forEach(x => {
                valor.push(x);
            });
            return valor
        
        }
    } catch (error) {
        console.log(error);
        return null
    }
},
async DeleteProductCart(id, idProdu) {
    try {
        const retorno = await DB.getById(id).then(res => {
          
            const data = res
                
 
            if (data.Productos.length === 0) {
                return null
            } else {
                const indice = data.Productos.findIndex(elemento=>elemento.id==idProdu)
                if (indice==-1) {
                    return null;
                } else {
                    data.Productos.splice(indice,1)
                DB.ModifyById(id, data)
                return 1
                }
                
            }
        })
        return retorno
    } catch (error) {
        console.log(error);
    }

}

}