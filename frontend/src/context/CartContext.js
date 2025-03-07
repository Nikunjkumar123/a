"use client";

import { axiosInstance } from "@/app/account/page";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import axios from "axios";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState({ items: [] });

  const setCartToState = async () => {
    if (user) {
      try {
        let userId = user?.userId?.userId;
        if (userId) {
          const response = await axiosInstance.post(`/api/v1/cart`, {
            userId: userId,
          });
          setCart({ items: response.data.items });
        }
      } catch (error) {
        console.error("Error fetching cart from server:", error);
        setCart({ items: [] }); // if error, set cart to empty array.
      }
    } else {
      const savedCart = localStorage.getItem("cart");
      setCart(savedCart ? JSON.parse(savedCart) : { items: [] });
    }
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    quantity = 1,
  }) => {
    if (user) {
      try {
        await axiosInstance.post("/api/v1/cart/add", {
          user: user?.userId?.userId,
          items: [{ productId: product, quantity: quantity, price: price }],
        });
        setCartToState(); // Refresh cart from server
      } catch (error) {
        console.log("error", error);

        if (error.response && error.response.status === 400) {
          toast.error(
            error.response.data.message || "Product is out of stock."
          );
        } else {
          toast.error("Something went wrong. Please try again later in cart.");
        }
      }
    } else {
      const item = { product, name, price, image, stock, quantity };
      const isItemExist = cart.items.find(
        (cartItem) => cartItem.product === item.product
      );
      let newCartItems;
      if (isItemExist) {
        newCartItems = cart.items.map((i) =>
          i.product === isItemExist.product
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        newCartItems = [...cart.items, item];
      }
      localStorage.setItem("cart", JSON.stringify({ items: newCartItems }));
      setCartToState();
    }
  };

  const addCart = async ({ items }) => {
    const updatedProducts = items?.map(({ product, ...rest }) => ({
      productId: product,
      ...rest,
    }));

    try {
      await axiosInstance.post("/api/v1/cart/add", {
        user: user?.userId?.userId,
        items: updatedProducts,
      });
      setCartToState(); // Refresh cart from server
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Product is out of stock.");
      } else {
        toast.error("Error adding item to server cart:");
      }
    }
  };

  const updateCartQuantity = async (item) => {
    try {
      await axiosInstance.post("/api/v1/cart/add", {
        user: user?.userId?.userId,
        items: [item],
      });
      setCartToState(); // Refresh cart from server
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Product is out of stock.");
      } else {
        toast.error("Error adding item to server cart:");
      }
    }
  };

  const deleteItemFromCart = async (id) => {
    if (user) {
      try {
        await axios.delete(
          `https://api.mrandmrsperfecttrips.in/api/v1/cart/remove/${id}`,
          {
            data: { userId: user?.userId?.userId },
            withCredentials: true,
          }
        );
        setCartToState();
      } catch (error) {
        console.error("Error deleting item from server cart:", error);
      }
    } else {
      const newCartItems = cart?.items?.filter((i) => i.product !== id);
      localStorage.setItem("cart", JSON.stringify({ items: newCartItems }));
      setCartToState();
    }
  };
  useEffect(() => {
    setCartToState();
  }, [user]); // Re-run effect when user changes

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        setCartToState,
        setCart,
        addCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
