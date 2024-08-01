const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { addCartProduct, getAllMyCartProducts, deleteProductById, editCartProductQuantity } = require("../controllers/cart");
const router = express.Router();

router.get("/",requireAuth, getAllMyCartProducts);//get my cart products
router.post("/:id", requireAuth,addCartProduct);//add product to my cart 
router.delete("/:id", requireAuth, deleteProductById);//delete product from my cart 
router.patch("/:id", requireAuth,editCartProductQuantity);//change product quantity 

module.exports = router;