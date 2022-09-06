const express = require('@awaitjs/express');
const { Auth } = require('../../middleware/Auth');
const controller= require('./controller')
const router = express.Router();

router.postAsync('/' ,controller.newCart)
router.deleteAsync('/:id', controller.deleteCart)
router.getAsync('/:id/productos', controller.getCartProd)
router.postAsync('/:id/productos',controller.addProduct)
router.deleteAsync('/:id/productos/:id_prod', controller.deleteCartProd)


module.exports= router;