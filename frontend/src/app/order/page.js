"use client";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../account/page";
import { UserContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";

const Orders = () => {
  const { user, fetchUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      let userId = user?.userId?.userId;
      console.log("userinOrder", user);
      const response = await axiosInstance.get(`/api/v1/order/${userId}`);
      console.log("response data order", response.data);
      // setOrders(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  
  useEffect(() => {
    if (user && user.userId?.userId) {
      fetchOrders();
    }
  }, [user]);
  
  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-20">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                My orders
              </h2>
            </div>
            {orders && orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <div className="mt-6 flow-root sm:mt-8" key={order._id}>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      <div className="flex flex-wrap items-center gap-y-4 py-6">
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 mr-20">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Order ID:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white ">
                            <p>{order._id}</p>
                          </dd>
                        </dl>
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Name:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            {order.items[0]?.product?.name}
                          </dd>
                        </dl>
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Date:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            {new Date(order.orderDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </dd>
                        </dl>

                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Price:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            {order.totalAmount}
                          </dd>
                        </dl>

                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Status:
                          </dt>
                          <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                           
                            {order.status}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center mt-5">Orders are empty</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orders;
