const express = require("express");
const { addToCart, removeFromCart, getCart, clearCart } = require("../controllers/cart.controller.js");
const router = express.Router();

router.post("/add", addToCart);          
router.delete("/remove/:productId", removeFromCart); 
router.post("/", getCart);                
router.delete("/clear", clearCart);       

module.exports = router;
