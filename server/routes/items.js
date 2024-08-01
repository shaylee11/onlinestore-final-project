const express = require('express')
const router = express.Router()
const {addProduct, deleteProductById, getAllProducts, searchByName, editProduct} = require("../controllers/item")
const { requireAuth, requireAdminAuth } = require('../middleware/requireAuth')


router.post('/',requireAdminAuth,addProduct)

router.put('/:id',requireAdminAuth, editProduct);

router.delete('/:id',requireAdminAuth, deleteProductById);

router.get('/',requireAuth, getAllProducts);

router.get('/search',requireAuth, searchByName);

module.exports = router;