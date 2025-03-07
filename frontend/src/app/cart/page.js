"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { UserContext } from "@/context/AuthContext";
import { toast } from "sonner";

const CartPage = () => {
  const { user } = useContext(UserContext);
  const {
    addCart,
    updateCartQuantity,
    cart,
    addItemToCart,
    deleteItemFromCart,
  } = useContext(CartContext);
  const router = useRouter();

  const handleToCheckout = () => {
    router.push("/checkout");
  };

  const increaseQty = (item) => {
    
    if (item.quantity < item.stock) {
      if (user) {
        updateCartQuantity({ ...item, quantity: 1 });
      } else {
        addItemToCart({ ...item, quantity: 1 });
      }
    }
  };

  const decreaseQty = (item) => {
    if (item.quantity <= 1) {
      toast.warning("Quantity cannot be less than 1");
      return;
    }

    if (item.quantity <= 1) {
      toast.warning("Quantity cannot be less than 1");
      return;
    }
    if (item.quantity > 1) {
      if (user) {
        updateCartQuantity({ ...item, quantity: -1 });
      } else {
        addItemToCart({ ...item, quantity: -1 });
      }
    }
  };

  const removeFromCart = (id) => {
    deleteItemFromCart(id);
  };

  const calculateTotal = () =>
    cart.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <>
      <div className="container mx-auto px-6 py-12 mt-24">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Your Shopping Cart
        </h2>

        {cart?.items?.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-2 font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="py-4 px-2 font-semibold text-gray-700">
                    Unit Price
                  </th>
                  <th className="py-4 px-2 font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="py-4 px-2 font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="py-4 px-2 font-semibold text-gray-700">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, i) => (
                  <tr key={"item" + i} className="border-b border-gray-100">
                    <td className="py-6 px-2">
                      <div className="flex items-center gap-6">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {item.name.charAt(0).toUpperCase() +
                              item.name.slice(1)}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Stock: {item.stock}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-2 text-gray-800">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="py-6 px-2">
                      <div className="flex items-center border border-gray-200 rounded-lg w-32">
                        <button
                          onClick={() => decreaseQty(item)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item)}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-6 px-2 font-medium text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-6 px-2">
                      <button
                        onClick={() =>
                          user
                            ? removeFromCart(item.productId)
                            : removeFromCart(item.product)
                        }
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 flex justify-between items-start">
              <Button
                onClick={() => router.push("/shop")}
                className="bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors"
              >
                ← Continue Shopping
              </Button>

              <div className="bg-gray-50 rounded-lg p-6 w-96">
                <h3 className="text-xl font-bold text-gray-800">
                  Subtotal: ₹{calculateTotal()}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Tax included. Shipping calculated at checkout.
                </p>
                <Button
                  onClick={handleToCheckout}
                  className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Proceed To Checkout →
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty.</p>
            <Button
              onClick={() => router.push("/shop")}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              ← Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
