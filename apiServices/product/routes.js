const express = require('@awaitjs/express');
const controller = require('./controller');


const router = express.Router();

router.getAsync('/:id', controller.getProducts);
router.postAsync('/', controller.newProduct);
router.putAsync('/:id', controller.editProduct)
router.deleteAsync('/:id', controller.delete);
