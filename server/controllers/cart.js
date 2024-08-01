const CartProduct = require("../models/cart");
const Product = require("../models/item");

async function addCartProduct(req, res) {
  const { id } = req.params;

  try {
    // Find the product by ID
    const selectedProduct = await Product.findById(id);
    if (!selectedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the user's cart
    const existingCartProduct = await CartProduct.findOne({
      userId: req.user._id,
      name: selectedProduct.name, // Assuming uniqueness is based on product name
    });

    if (existingCartProduct) {
      return res.status(400).json({ message: "You already inserted this product into your cart" });
    }

    // Create a new cart product entry
    const cartProduct = new CartProduct({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      category: selectedProduct.category,
      image: selectedProduct.image,
      userId: req.user._id,
    });

    const newCartProduct = await cartProduct.save();
    res.status(201).json({ message: "New product added to cart successfully", newCartProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteProductById(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deletedProduct = await CartProduct.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(401).json({ message: "product not found" });

    const products = await CartProduct.find({ userId });

    res.status(200).json({
      message: "product deleted successfully",
      deletedProduct,
      products,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllMyCartProducts(req, res) {
  const userId = req.user._id;

  try {
    const products = await CartProduct.find({ userId });

    res
      .status(200)
      .json({ message: "products fetched successfully", products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function editCartProductQuantity(req, res) {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const editedProduct = await CartProduct.findByIdAndUpdate(id, {
      quantity: req.body.quantity,
    });
    if (!editedProduct)
      return res.status(404).json({ message: "product not found" });

    const products = await CartProduct.find({userId});

    res
      .status(200)
      .json({ message: "products quantity changed successfully",editedProduct ,products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { addCartProduct, getAllMyCartProducts, deleteProductById, editCartProductQuantity };
