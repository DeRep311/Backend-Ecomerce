const { getProduCart, addProduCart, newCart, deleteCart, DeleteProdu, AllCarts, Allbuy } = require('./model');
const log = require('winston');
const { Console } = require('winston/lib/winston/transports');

module.exports = {
    async newCart(req, res) {
       
       if (!req.session.Cart) {
         const cart= await newCart()
         log.info(cart)
         if (cart) {
             req.session.Cart= cart
             res.send(`Su carrito fue creado: ${JSON.stringify(req.session.Cart)}`)
         }
       }else{
        res.send('Ya tiene un carrito creado')
       }
        
        
    },
    async deleteCart(req, res) {
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
        var id = req.body.id;
        id=await addProduCart(id)
        var produ;
        if (req.session.Cart.Producto) {
           
            if (id) {
                produ= id[0];
                req.session.Cart.Producto.push(produ)
                res.send(`Producto ingresado`)
            } else {
                res.status(400).send('Producto no encontrado');
            }

        } else {
            
            if (id) {
                req.session.Cart.Producto= id
                res.send(`Producto ingresado`)
            } else {
                res.status(400).send('Producto no encontrado');
            }
          
        }
           
       } catch (error) {
           log.error(error);
            res.send(`Error intentelo nuevamente`)   
       }
    },
    async deleteCartProd(req, res) {
      const id = req.params.id_prod;
      const datos= await DeleteProdu(id, req.session.Cart)
      req.session.Cart= datos
      res.send('Producto borrado correctamente')

        
    },
    async buy(req,res){
        NecesaryData= req.user
        cart= req.session.Cart
        
        const validation= await Allbuy(NecesaryData,cart)


    }

}