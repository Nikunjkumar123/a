const Razorpay = require("razorpay");
const OrderModel = require("../Model/Order.model.js");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("req body", req.body);

    const order = await OrderModel.find({ user: userId });
    console.log("order", order);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const options = {
      amount: order.totalAmount * 100, // Amount in paise (e.g., 100 INR -> 10000)
      currency: "INR",
      receipt: "receipt_order_123",
    };

    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_SECRET,
      });

      instance.orders.create(options, function (err, order) {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Server error", error: err });
        }
        return res
          .status(200)
          .json({ success: true, message: "Order created", order });
      });
    } catch (error) {
      console.log("order creation error", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  } catch (error) {
    console.log("order creation error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    return res
      .status(200)
      .json({ success: true, message: "Payment verification success" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };
