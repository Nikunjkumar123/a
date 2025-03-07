const express = require("express");

const orderRouter = express.Router();

const {
  addOrder,
  getOrder,
  deleteOrder,
  updateOrder,
  getAllOrders,
  getOrderById,
  getOrderDetails,
} = require("../controllers/Order.controller.js");
const verifyToken = require("../Middleware/verifyToken.js");

orderRouter.route("/").patch(getOrder).post(addOrder);
orderRouter.route("/cancel/:id").delete(deleteOrder);
orderRouter.route("/:id").get( getOrderById);
orderRouter.route("/getDetails/:id").get( getOrderDetails);
orderRouter.route("/update").patch( updateOrder);
// orderRouter.route("/all").get( getAllOrders);
orderRouter.route("/all/:id").get( getAllOrders);
module.exports = orderRouter;
