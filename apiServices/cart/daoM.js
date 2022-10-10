const CRUD = require('./../../Services/Mongo/MongoDB');
const DB = new CRUD(2);
module.exports = {
    async ReadAllCart() {
        try {
            const Value = await DB.Read()
            return Value;
        } catch (error) {
            console.log(error);
        }


    },
    async ReadCart(id) {
        try {
            const Value = await DB.Read(id);
            return Value;
        } catch (error) {
            console.log("no se encuentra el carrito");
        }
    },

    async WriteCart(data) {
        try {
            const datos = await DB.Create(data)
            console.log(`done`);
            return datos
        } catch (error) {
            console.log(error);
        }
    }
    ,

    async DeleteCartById(id) {
        try {
            await DB.Delete(id)

            return console.log(`Delete Produ ID:${id}, done`);
        } catch (error) {
            console.log("No se encuentra la id");
        }
    }
    ,


    async DeleteProductCart(id) {
        try {
            const Value = await DB.Read(id)
            if (Value.Product == null) {
                console.log("Este carrito no tiene productos");
                return null
            } else {
                Value.Product = "";
                DB.Update(id, Value)
            }

        } catch (error) {
            console.log(error);
        }
    },
    async AddProducts(idCart, Produ) {

        try {
            DB.Read(idCart).then(res => {
                const data = res
                console.log(data)
                if (data.Productos == undefined) {

                    newId = 1;

                } else {

                    newId = data.Productos[data.Productos.length - 1].id + 1;

                }
                datosFinally = { ...Produ, id: newId }
                data.Productos.push(datosFinally)
                DB.Update(idCart, data);
            })
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
    async DeleteProductCart(id, idProdu) {
        try {
            const retorno = await DB.Read(id).then(res => {

                const data = res


                if (data.Productos.length === 0) {
                    return null
                } else {
                    const indice = data.Productos.findIndex(elemento => elemento.id == idProdu)
                    if (indice == -1) {
                        return null;
                    } else {
                        data.Productos.splice(indice, 1)
                        DB.Update(id, data)
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
