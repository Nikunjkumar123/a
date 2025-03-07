import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "sonner";

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);

get 

  const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/orders/getDetails/${id}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/api/v1/orders/${orderId}`, { status: newStatus });
      toast.success("Order status updated successfully");
      fetchOrders(); // Refresh order list
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };
  
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Payment Status</th>
              <th className="p-3 border">Order Status</th>
              <th className="p-3 border">Order Date</th>
              <th className="p-3 border">Payment Mode</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center border">
                <td className="p-3 border">{order._id}</td>
                <td className="p-3 border">
                  {order.items.map((item) => (
                    <div key={item.product._id}>{item.product.name}</div>
                  ))}
                </td>
                <td className="p-3 border">₹{order.totalAmount}</td>
                <td className="p-3 border">{order.paymentStatus}</td>
                <td className="p-3 border">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="border p-2 rounded-md"
                  >
                    {[
                      "Pending",
                      "Processing",
                      "Shipped",
                      "Delivered",
                      "Cancelled",
                    ].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 border">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="p-3 border">{order.paymentMethod}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => updateOrderStatus(order._id, "Cancelled")}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
