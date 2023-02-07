const CRUD = require('../../Services/Databases/Mongo/Manager/ProductoManager');
const DB = new CRUD();
const log = require('winston');
const { productosFilter } = require('./DTO');
module.exports = {
    async AddProducts(Produ) {

        try {
          const producto= await DB.Read(Produ)
          
           return producto 
        } catch (error) {
            console.log(error);
            return null
        }
    },

    async ReadProductCart(id) {
        try {
            const data = await DB.Read(id)

            

            if (data.Productos== undefined) {
                console.log("Este carrito no tiene productos");
                return null
            } else {
                const Value = []
                data.Productos.forEach(x => {
                    Value.push(x);
                });
                return Value

            }
        } catch (error) {
            console.log(error);
            return null
        }
    },
    async DeleteProductCart(id) {
        try {
           
        } catch (error) {
            console.log(error);
        }

    }
}
