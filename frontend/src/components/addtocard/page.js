"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/account/page";
import { CartContext } from "@/context/CartContext";

const AddToCartButton = ({ product }) => {
  const [adding, setAdding] = useState(false);
  const { cart } = useContext(CartContext);
  const router = useRouter();

  const addToCart = async () => {
    setAdding(true);
    try {
      const response = await axiosInstance.post("/api/v1/cart/add", {
        productId: product._id,
        items: cart?.cartItems,
      });

      if (response.ok) {
        router.push("/cart");
      } else {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <button
      onClick={addToCart}
      disabled={adding}
      className={`px-4 py-2 rounded ${
        adding ? "bg-gray-300" : "bg-blue-500 text-white"
      } hover:bg-blue-700`}
    >
      {adding ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
