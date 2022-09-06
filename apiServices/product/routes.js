const express = require('@awaitjs/express');
const Auth = require('../../middleware/Auth');
const controller = require('./controller');


const router = express.Router();

router.getAsync('/:id', controller.getProducts);
router.postAsync('/',Auth, controller.newProduct);
router.putAsync('/:id',Auth ,controller.editProduct)
router.deleteAsync('/:id',Auth ,controller.delete);


module.exports= router;