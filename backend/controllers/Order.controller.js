const Order = require("../Model/Order.model.js");
const Cart = require("../Model/Cart.model.js");
const UserModel = require("../Model/UserModel.js");
const ProductModel = require("../Model/Product.model.js");

const addOrder = async (req, res) => {
  try {
    const {
      userId,
      paymentStatus,
      paymentMethod,
      name,
      phone,
      email,
      address,
      state,
      city,
      pin,
      nearby,
      transactionId,
    } = req.body;

    if (
      [name, phone, email, address, state, city, pin, paymentMethod].some(
        (item) => !item
      )
    )
      return res.status(400).json({ message: "Enter complete fields" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    let cartItems = [];

    for (let item of cart.items) {
      cartItems.push({
        product: item.product,
        price: item.price,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      user: userId,
      name,
      phone,
      email,
      address,
      state,
      city,
      pin,
      nearby,
      transactionId,
      paymentStatus,
      items: cartItems,
      totalAmount: cart.totalPrice,
      paymentMethod,
      status: "Pending",
    });

    await UserModel.findByIdAndUpdate(userId, { phone: phone });
  try {
    let productData
      cart.items?.forEach(async (item) => {
       productData=  await ProductModel.findByIdAndUpdate(item.product, {
          $inc: { "variant[0].stock": -item.quantity }
        },{new:true});
      });
      console.log("new product",productData);
  } catch (error) {
    console.log("addOrder",error);
    
  }
    
    await Cart.findOneAndDelete({ user: userId }); // Clear cart after placing order
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "Pending")
      return res.status(400).json({ message: "Cannot cancel processed order" });

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const getOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({ user: userId }).populate("items.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // let {role}=req.user
    // if(!role==="admin"){
    //   return res.status(400).json({ message: "You are not authorized" });
    // }
    console.log("hit req");

    const orders = await Order.find().populate("items.product");

    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { id, status } = req.body;
    const { role } = req.user;
    if (role !== "admin")
      return res.status(400).json({ message: "You are not authorized" });
    if (!id || !status)
      return res.status(400).json({ message: "Enter complete fields" });
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    console.log("order error", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    let { id } = req.params;

    const orders = await Order.find({ user: id }).populate("items.product");
    return res.status(200).json(orders);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    console.log("hit req");

    let { id } = req.params;
    const orders = await Order.findOne({ _id: id }).populate("items.product");
    if (!orders) {
      return res.state(403).json({ message: "Order not found" });
    }
    return res.status(200).json(orders);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports = {
  addOrder,
  deleteOrder,
  getOrder,
  updateOrder,
  getAllOrders,
  getOrderById,
  getOrderDetails,
};
