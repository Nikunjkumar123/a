import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/context/CartContext";
import CheckoutDetails from "../checkoutDetails/page";
import { Button } from "../ui/button"; // Assuming Button is a custom component
import { UserContext } from "@/context/AuthContext";
import { axiosInstance } from "@/app/account/page";

const Cart = () => {
  const { setCart,setCartToState, cart, addItemToCart, deleteItemFromCart } =
    useContext(CartContext);
  const { user } = useContext(UserContext);
  const [showCheckout, setShowCheckout] = useState(false); // State to toggle checkout form

  const increaseQty = (item) => {
    if (item.quantity < item.stock) {
      addItemToCart({ ...item, quantity: 1 }); // Increase quantity by 1
    }
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      addItemToCart({ ...item, quantity: -1 }); // Decrease quantity by 1
    }
  };

  const removeFromCart = (id) => {
    deleteItemFromCart(id); // Remove item from the cart by product ID
  };


  const calculateTotal = () => {
    return cart.cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    setCartToState();
  }, [user,router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">
        {cart?.items?.length > 0
          ? `${cart.items.length} Items in Your Cart`
          : "Your Cart is Empty"}
      </h2>

      {cart?.items?.length > 0 ? (
        <div className="grid gap-4">
          {cart.items.map((item, i) => (
            <div
              key={"item" + i}
              className="flex items-center justify-between border p-4 rounded-md"
            >
              <Image
                src={item.product?.images[0]}
                alt={item.product?.name}
                className="w-16 h-16 object-cover"
                width={64}
                height={64}
              />
              <div>
                <h2>{item.product?.name}</h2>
                <p>${item.product?.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQty(item)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.product.quantity}</span>
                <button
                  onClick={() => increaseQty(item)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is emptyss.</p>
      )}

      <div className="mt-4">
        <h3 className="text-xl font-bold">Total: ${cart.totalPrice}</h3>
      </div>

      {/* Pay Now button to toggle checkout */}
      <Button
        type="button"
        onClick={() => setShowCheckout(true)} // Show CheckoutDetails when clicked
        className="w-full mt-4 border-light-blue-800 text-white bg-light-blue-800 hover:bg-light-blue-600"
      >
        Pay Now
      </Button>

      {/* Show CheckoutDetails if showCheckout is true */}
      {showCheckout && <CheckoutDetails />}
    </div>
  );
};

const Card = ({ product }) => {
 
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{product.name}</h2>
        <p className="text-gray-700 text-base mb-2">${product.price}</p>
        <p className="text-gray-600 text-sm mb-4">
          Stock: {product.stock} units
        </p>

        <Button
          type="button"
          onClick={() => {}} // Add your add to cart function here
          className="w-full bg-light-blue-800 text-white hover:bg-light-blue-600"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
export { Card };
