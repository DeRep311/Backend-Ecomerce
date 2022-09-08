const Prod = require('./model');
module.exports = {
    async newProduct(req, res) {
        try {
            const producto = {
                Nombre: req.body.Nombre,
                Descripcion: "",
                Codigo: req.body.Codigo,
                Foto: req.body.Foto,
                Precio: req.body.Precio,
                Stock: req.body.Stock,
                Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
            }
            await Prod.newProdu(producto);
            res.send(`${JSON.stringify(producto)} Ya ingresado`)
        } catch (error) {

        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            await Prod.deleteProdu(id);
            res.send(`Producto elminado correctamente :)`)
        } catch (error) {

        }
    },
    async getProducts(req, res) {
        try {
            const id = req.params.id;
            if (id === undefined) {
                await Prod.getAllProdu().then(resu => {
                    console.log(resu);
                    res.send(resu)
                    
                })
                               
                
            } else {
                await Prod.getProdu(id).then(resp => {
                    res.send(resp)
                    console.log("llego");
                })
                
            }

        } catch (error) {
            console.log(error);
        }
    },
    async editProduct(req, res) {
        const ide = req.params.id;
        const producto = {
            Nombre: req.body.Nombre,
            Descripcion: "",
            Codigo: req.body.Codigo,
            Foto: req.body.Foto,
            Precio: req.body.Precio,
            Stock: req.body.Stock,
            Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
            id: ide
         
        }
        await Prod.ModProdu(ide, producto);
        res.send(`Datos ingresados con exito`)
    },
}