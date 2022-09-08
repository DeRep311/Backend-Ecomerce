const express= require('express')
const cart= require('../apiServices/cart/routes')
const productos= require('../apiServices/product/routes')
const router = express.Router();
router.use('/carrito',cart)
router.use('/productos', productos)
module.exports= router;