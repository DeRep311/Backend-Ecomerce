const { getProduCart, addProduCart, newCart, deleteCart, DeleteProdu, AllCarts } = require('./model');


module.exports = {
    async newCart(req, res) {
        await newCart({ Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,})
        let valor_id=await AllCarts().then(resu=>{
           
        res.send(`Nuevo carrito creado id:${resu.length}`)
        })
        
    },
    async deleteCart(req, res) {
        const id = req.params.id;
        await deleteCart(id);
        res.send(`Carrito id:${id} eliminado`)
    },
    async getCartProd(req, res) {
        const id = req.params.id;
        const productos = await getProduCart(id)
        if (productos==null) {
            res.send("el id no se encuentra o no tiene productos")
        } else {
            res.send(productos)
        }

    },
    async addProduct(req, res) {
        //Comentar sobre inconcistencia con la tarea
       try {
            const id = req.params.id;
            const producto = {
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                Codigo: req.body.Codigo,
                Foto: req.body.URLimg,
                Precio: req.body.Precio,
                Stock: req.body.Stock,
                Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
                id: req.body.id
            }
            await addProduCart(id, producto)
                res.send(`Producto ingresado`)
       } catch (error) {
           console.log(error);
            res.send(`Error intentelo nuevamente`)   
       }
    },
    async deleteCartProd(req, res) {
        const id= req.params.id;
        const idProdu= req.params.id_prod;
        await  DeleteProdu(id, idProdu).then(resu=>{
            if (resu==null) {
                res.send("El producto no existe o este carrito no tiene productos")
            } else {
                res.send("Producto eliminado correctamente")
            }
        })
        
    }

}