"use client";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../Login/page";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const fetchAllOrder = async () => {
    try {
      const response = await axiosInstance.get("api/v1/order/all/yes");
      console.log("response", response);
      
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchAllOrder();
  }, []);
  // Using useEffect to ensure localStorage is accessed on the client-side
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []); // Empty dependency array to run this effect once when the component mounts

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order deleted successfully!");
  };

  const handleEditOrder = (orderId) => {
    if (router) {
      router.push(`/page/order/update-order?id=${orderId}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Orders</h2>
      <table className="min-w-full bg-white border text-left border-gray-200 mt-8">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">OrderID</th>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">PaymentStatus</th>
            <th className="py-2 px-4 border-b">OrderStatus</th>
            <th className="py-2 px-4 border-b">Order Date</th>
            <th className="py-2 px-4 border-b">PaymentMode</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">{order.items[0].product.name.charAt(0).toUpperCase() + order.items[0].product.name.slice(1)}</td>
              <td className="py-2 px-4 border-b">{order.totalAmount}</td>
              <td className="py-2 px-4 border-b">{order.paymentStatus}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                {new Date(order.orderDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </td>
              <td className="py-2 px-4 border-b">{order.paymentMethod}</td>
              <td className="py-2 px-4 border-b">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleEditOrder(order?._id)}
                >
                  <Edit2Icon size={16} />
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600"
                  onClick={() => handleDeleteOrder(order.user)}
                >
                  <Trash2Icon size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
