const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }, // Store product price at the time of adding
    },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
