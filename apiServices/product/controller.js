const log = require('winston');
const Prod = require('./model');

module.exports = {
    async newProduct(req, res) {
        try {
            //el tipo de respuesta esta preparado para implementarle vistas por eso la propiedad Status (echo para implementar un if en hbs por ej)
            const Product = await Prod.newProdu(req.body);
            res.json(Product)
        } catch (error) {
            log.error(error.stack);
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const status = await Prod.deleteProdu(id);
            res.status(status.Error).send(status.Message)

        } catch (error) {
            log.error(error.stack);
        }
    },
    async getProducts(req, res) {
        try {

            const productos = await Prod.getAllProdu(req.params.id)
            if (productos.Validate) {
                res.json(productos.Product)
            }else{
                res.sendStatus(productos.Error).json({})
            }
            


        } catch (error) { 
            res.sendStatus(400)
            log.error(error.stack);
        }
    },
    async editProduct(req, res) {
        try {
            const ide = req.params.id;
            const status = await Prod.ModProdu(ide, req.body);
            status.Validate ? res.json(status) : res.status(status.Error).send(status.Message)

        } catch (error) {
            log.error(error.stack);
        }
    }
}
