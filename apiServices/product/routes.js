const express = require('@awaitjs/express');
const Auth = require('../../middleware/Auth');
const controller = require('./controller');


const router = express.Router();

router.getAsync('/',controller.getProducts);
router.getAsync('/:id', controller.getProducts);
router.postAsync('/', controller.newProduct);
router.putAsync('/:id',  controller.editProduct);
router.deleteAsync('/:id',  controller.delete);


module.exports = router; 