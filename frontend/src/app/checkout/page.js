"use client";
import { UserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../account/page";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";

const CheckoutPage = () => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [paymentmethod, setPaymentMethod] = useState("cod");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
const {fetchUser}=useContext(UserContext)
const {cart}=useContext(CartContext)
  const handleCheckout = async () => {
    // e.preventDefault();
    if (
      [
        name,
        email,
        address,
        phone,
        pin,
        landmark,
        city,
        state,
        paymentmethod,
      ].some((field) => !field)
    ) {
    return toast.error("Please fill all the fields");
    }
    if(selectedPaymentMethod === "") {
      return toast.error("Please select a payment method");
    }
    if (phone.length !== 10) {
     return toast.error("Please enter a valid phone number");
    }

    const data = {
      userId: user?.userId?.userId,
      name,
      email,
      address,
      phone,
      pin,
      nearby: landmark,
      city,
      state,
      paymentMethod: selectedPaymentMethod,
    };

    try {
      const response = await axiosInstance.post("/api/v1/order", data);
      console.log("response",response);
      
      if (response.status === 200 || response.status === 201) {
        router.push("/order");
        toast.success("Order placed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const calculateTotal = () =>
    cart.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  useEffect(()=>{
    fetchUser()
  },[])

  useEffect(() => {
    if(user?.userId?.userId){
      if (!user) {
        router.push("/account");
      }
      else{
        setIsLoading(false)
      }
    }else{
      router.push("/account");
    }
  
  }, [user]);


  const OnPayment = async () => {
    try {
      // Create order
      const response = await axiosInstance.post("/api/v1/payment/create-order", {
        userId: user?.userId?.userId,
      });
  
      console.log("response", response);

      const paymentObject = new window.Razorpay({
        key: "rzp_test_2IEDRFaCoooycY",
        order_id: response.data.id, // Make sure this matches what Razorpay expects
        ...response.data,
        handler: async function (response) {
          console.log("response", response);
          
          const options = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
  
          try {
            const res = await axiosInstance.post("/api/v1/payment/verify-payment", options);
            console.log("res", res);
  
            if (res?.data?.success) {
              toast.success(res.data.message);
            } else {
              toast.error(res.data.message);
            }
          } catch (verifyError) {
            console.log("Payment verification error", verifyError);
            toast.error("Payment verification failed");
          }
        },
      });
  
      paymentObject.open();
  
    } catch (error) {
      console.log("payment error", error);
      toast.error("Payment failed. Please try again.");
    }
  };
  

  return (
    <>
    {/* {!user && router.push("/account")} */}
  
      {
        isLoading ? ( <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>):
  
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-24">
        {/* Left Section - Contact & Delivery */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-4 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <div className="flex items-center mb-6">
          <input type="checkbox" className="mr-2" />
          <span>Email me with news and offers</span>
        </div> */}

          <h2 className="text-2xl font-bold mb-4 mt-2">Delivery</h2>

          <div className=" mb-4">
            <input
              type="text"
              placeholder="Full name"
              className="border p-2 w-full rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <textarea
            type="textarea"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={5}
            className="w-full border p-2 rounded-md mb-4 resize-none"
            required
          ></textarea>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="State"
              className="border p-2 rounded-md"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="PIN Code"
              className="border p-2 rounded-md"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="w-full border p-2 rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Landmark (optional)"
            className="w-full border p-2 rounded-md mb-4 mt-4"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            required
          />
          <div className="mb-4 mt-4">
            <label className="block mb-1">Payment Method</label>
            <select
              className="w-full border p-2 rounded-md mt-4"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
              required
            >
              <option value={""}>Select payment method</option>
              <option value={"COD"}>Cash On Delivery</option>
              <option value={"Card"}>Card</option>
              <option value={"UPI"}>UPI</option>
            </select>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {
          cart?.items &&  cart?.items?.map((item,i)=>
              <div className="flex items-center mb-4" key={i}>
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-700">{item.quantity} Qty</p>
            </div>
            <span className="ml-auto font-bold">₹{item.price}</span>
          </div>
            )
          }
          {/* <input
            type="text"
            placeholder="Discount code"
            className="w-full border p-2 rounded-md mb-2"
          />
          <button className="w-full bg-gray-300 py-2 rounded-md text-gray-600">
            Apply
          </button> */}
          <div className="mt-4">
            {/* <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹85.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>-</span>
            </div> */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
            {/* <p className="text-sm text-gray-600 mt-1">
              Including ₹12.97 in taxes
            </p> */}
          </div>
          <button type="submit" onClick={handleCheckout} className="w-full mt-8 bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2 rounded-md">
            Place Order
          </button>
          <button type="button" onClick={OnPayment} className="w-full mt-8 bg-red-600 text-white hover:bg-red-700 transition-colors py-2 rounded-md">
          Payment
          </button>
        </div>
      </div>}
    </>
  );
};

export default CheckoutPage;
