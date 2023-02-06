const { getProduCart, addProduCart, newCart, DeleteProdu, Allbuy } = require('./model');
const log = require('winston');


module.exports = {
    async newCart(req, res) {

        if (!req.session.Cart) {
            const cart = await newCart()
            log.info(cart)
            //crea un nuevo carrito si ya existe, en el caso que no exista
            if (cart) {
                req.session.Cart = cart
                res.send(`Su carrito fue creado: ${JSON.stringify(req.session.Cart)}`)
            }
        } else {
            res.status(200).send('Ya tiene un carrito creado')
        }


    },
    async deleteCart(req, res) {
        //No tiene parametro de id pq por usuario solo se crea un carrito
        delete req.session.Cart;
        res.send(`Carrito a sido eliminado`)
    },
    async getCartProd(req, res) {
        const cart = req.session.Cart;
        const productos = await getProduCart(cart)
        if (productos) {
            res.send(productos)

        } else {
            res.send("No tiene productos")
        }

    },
    async addProduct(req, res) {

        try {
            var id = req.params.id_prod;
            id = await addProduCart(id)
            var produ;
            if (req.session.Cart.Producto) {

                if (id) {
                    produ = id[0];
                    req.session.Cart.Producto.push(produ)
                    res.send(`Producto ingresado`)
                } else {
                    res.status(400).send('Producto no encontrado');
                }

            } else {

                if (id) {
                    req.session.Cart.Producto = id
                    res.send(`Producto ingresado`)
                } else {
                    res.status(400).send('Producto no encontrado');
                }

            }

        } catch (error) {
            log.error(error);
            res.status(500).send(`Error intentelo nuevamente`)
        }
    },
    async deleteCartProd(req, res) {
        const id = req.params.id_prod;
        const datos = await DeleteProdu(id, req.session.Cart)
        
        req.session.Cart = datos
        res.status(200).send('Producto borrado correctamente')
    },
    async buy(req, res) {
        NecesaryData = req.UserId
        cart = req.session.Cart
        const validation = await Allbuy(NecesaryData, cart)

        validation ? res.status(200).send('Compra realizada, le llegara un email con la informacion')
            : res.status(404).send('Hubo un error en su compra, valide sus datos de sesion')


    }

}