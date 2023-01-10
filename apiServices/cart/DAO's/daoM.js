const CRUD = require('./../../../Services/Databases/Mongo/MongoDB');
const DB = new CRUD('Prod');
const log = require('winston')
module.exports = {
    async AddProducts(Produ) {

        try {
           producto= await DB.Read(Produ)
           return producto 
        } catch (error) {
            console.log(error);
            return null
        }
    },

    async ReadProductCart(id) {
        try {
            const data = await DB.Read(id)

            console.log(data.Productos);

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
