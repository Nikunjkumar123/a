const { default: mongoose } = require("mongoose");
const Cart = require("../Model/Cart.model.js");
const Product = require("../Model/Product.model.js");
const ProductModel = require("../Model/Product.model.js");
const UserModel = require("../Model/UserModel.js");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items } = req.body;

   await UserModel.findById(userId).then((user) => {
     if(!user){
      return res.status(404).json({ message: "User not found" });
     }
   })

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    let totalPrice = cart.totalPrice;

    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product)
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      const itemIndex = cart.items.findIndex(
        (cartItem) => cartItem.product.toString() === item.productId
      );

      // console.log("product", product.variant[0].stock);
      // console.log("itemIndex", cart.items[itemIndex].quantity);
      
      if (
        product.variant[0].stock <
        cart.items[itemIndex]?.quantity + item?.quantity
      ) {
        return res.status(400).json({ message: "Out of stock" });
      }
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += item.quantity;
      } else {
        cart.items.push({
          product: item.productId,
          quantity: item.quantity,
          price: item?.price,
        });
      }

      totalPrice += item.price * item.quantity;
    }

    cart.totalPrice = totalPrice;
    await cart.save();

    res.status(200).json({ message: "Products added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ❌ Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;
    console.log("userId", userId);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not in cart" });

    const removedItem = cart.items[itemIndex];
    cart.totalPrice -= removedItem.price * removedItem.quantity;
    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ message: "Product removed", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📜 Get cart details
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    let transformedCart;
    if (cart && cart.items.length > 0) {
      transformedCart = cart.items.map((item) => ({
        name: item.product.name,
        price: item.price, // Taking the first variant price
        productId: item.product._id,
        image: item.product.images[0] || null,
        quantity: item.quantity,
        totalPrice: cart.totalPrice,
        stock: item.product.variant[0].stock,
        user: cart.user,
        _id: cart._id,
      }));
    }

    if (!cart) return res.status(200).json({ message: "Cart is empty" });
    if (cart) {
      return res.status(200).json({ items: transformedCart });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🚮 Clear the entire cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addToCart, removeFromCart, getCart, clearCart };
