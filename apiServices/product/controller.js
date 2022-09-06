const Prod = require('./model');
module.exports = {
    async newProduct(req, res) { 
        try {
            const producto = {
                Nombre: req.body.Nombre,
                Descripcion: "",
                Codigo: req.body.Codigo,
                Foto: req.body.URLimg,
                Precio: req.body.Precio,
                Stock: req.body.Stock,
                Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
            }
            await Prod.newProdu(producto);
        } catch (error) {
            
        }
    },
    async delete(req, res) { 
        try {
            const id = req.params.id;
            await Prod.deleteProdu(id);
        } catch (error) {
            
        }
    },
    async getProducts(req, res) { 
        try {
            const id = req.params.id;
            await Prod.getProdu(id)
        } catch (error) {
            
        }
    },
    async editProduct(req, res) { 
        const id = req.params.id;
        const producto = {
            Nombre: req.body.Nombre,
            Descripcion: "",
            Codigo: req.body.Codigo,
            Foto: req.body.URLimg,
            Precio: req.body.Precio,
            Stock: req.body.Stock,
            Fecha: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
        }
        await Prod.ModProdu(id, producto);
    },
}