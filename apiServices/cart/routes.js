const express = require('@awaitjs/express');
const { isAutenticated } = require('../../middleware/Auth');
const controller= require('./controller')
const router = express.Router();

router.postAsync('/' ,controller.newCart)
router.deleteAsync('/', controller.deleteCart)
router.getAsync('/productos', controller.getCartProd)
router.postAsync('/productos',controller.addProduct)
router.deleteAsync('/productos/:id_prod', controller.deleteCartProd)
router.getAsync('/buy',isAutenticated,controller.buy)



module.exports= router;