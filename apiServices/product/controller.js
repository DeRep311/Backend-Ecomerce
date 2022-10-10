const Prod = require('./model');
module.exports = {
    async newProduct(req, res) {
        try {
            const producto = {
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                Codigo: req.body.Codigo,
                Foto: req.body.Foto,
                Precio: req.body.Precio,
                Stock: req.body.Stock,
                Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
            }
           const id= await Prod.newProdu(producto);
            res.send(`${JSON.stringify(producto)} Ya ingresado, su id es ${id}`)
        } catch (error) {
            console.log(error);
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            await Prod.deleteProdu(id);
            res.send(`Producto elminado correctamente :)`)
        } catch (error) {
            console.log(error);
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
        try {
            const ide = req.params.id;
            const producto = {
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                Codigo: req.body.Codigo,
                Foto: req.body.Foto,
                Precio: req.body.Precio,
                Stock: req.body.Stock,
                Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
                
             
            }
            await Prod.ModProdu(ide, producto);
            res.send(`Datos ingresados con exito`)
        } catch (error) {
            console.log(error);
        }
    }
}
