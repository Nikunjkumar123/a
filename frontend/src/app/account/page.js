"use client";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input"; // Ensure this Input component works as expected.
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";

const axiosInstance = axios.create({
  baseURL: "https://api.mrandmrsperfecttrips.in",
  withCredentials: true,
});

export { axiosInstance };

const defaultData = { Name: "", password: "", email: "" };

const AccountPage = () => {
  const { setUser, logout, fetchUser } = useContext(UserContext);
  const { addCart, setCartToState } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [step, setStep] = useState("verify");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(true);
  const router = useRouter();

  const handleSendVerificationCode = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // alert("Verification code sent to your email.");
    try {
      const { data } = await axiosInstance.post("/api/v1/auth/forgotPassword", {
        email,
      });

      if (data) {
        setStep("otp");
        toast.success(data.msg);
      }
    } catch (error) {}
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }
    // Add API call to verify OTP here
    try {
      const { data } = await axiosInstance.post("/api/v1/auth/verifyToken", {
        email,
        myToken: otp,
      });

      setStep("newPass");
      return toast.success("OTP verified successfully.");
    } catch (error) {
      toast.error("unable to verify");
      console.log("error", error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }
    try {
      const { data } = await axiosInstance.post("/api/v1/auth/updatePassword", {
        email,
        password: newPassword,
      });
      if (data.success) {
        toast.success("Password updated successfully.");
        router.push("/account");
        setStep("verify");
        setOpenDialog(false);
      }
    } catch (error) {
      toast.error("Verification failed");
      console.log("error", error.message);
    }
  };

  const [data, setData] = useState(defaultData);
  const [isLoginForm, setIsLoginForm] = useState(true); // Track which form to show

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast("Please fill all the fields");
      return;
    }

    try {
      const CartLocalData = JSON.parse(localStorage.getItem("cart"));
      const response = await axiosInstance.post("/api/v1/auth/Login", {
        email: data.email,
        password: data.password,
      });
      console.log("user response", response);

      // Clear the input fields after successful login
      setData(defaultData);
      setCartToState();
      fetchUser();
      if (response.status === 200 || response.status === 201) {
        // Redirect to profile
        setUser(response.data);

        if (CartLocalData && CartLocalData.items.length > 0) {
          await addCart(CartLocalData);
        }

        router.push("/");
        toast.success("Login successfully");
      }
    } catch (error) {
      console.log("error", error);

      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      toast.error(errorMessage);
      // Show toast notification for errors
      return toast.error(errorMessage);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();

    if (!data.Name || !data.password || !data.email) {
      toast("Please fill all the fields");
      return;
    }

    try {
      console.log("clicked");

      const response = await axiosInstance.post("/api/v1/auth/register", {
        Name: data.Name,
        email: data.email,
        password: data.password,
      });

      setData(response.data);
      if (response.status === 200 || response.status === 201) {
        toast.success("Registration successful! You can now log in.");
        setIsLoginForm(true); // Show login form after successful registration
        setData(defaultData);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  const handleLoginClick = () => {
    setIsLoginForm(true);
    setData(defaultData);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white px-4 pt-8 pb-4 mb-4 rounded-lg shadow-lg w-96">
        {isLoginForm ? (
          <div>
            <h1 className="text-3xl mb-4 text-center font-semibold">
              Login Now
            </h1>
            <form onSubmit={onLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                  required
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={onValueChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={onValueChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-2 py-2 text-white rounded-full w-full bg-blue-800 p-2 hover:text-black border border-blue-700 hover:bg-blue-100"
              >
                Submit
              </button>
              {openDialog && (
                <Dialog>
                  <DialogTrigger asChild>
                    <span
                      className="cursor-pointer block text-right underline hover:text-blue-800"
                      onClick={() => setOpenDialog(true)}
                    >
                      Forget password?
                    </span>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Forgot Password</DialogTitle>
                      <DialogDescription>
                        {step === "verify" && (
                          <>
                            {"Enter your email to receive a verification code."}
                            {/* {setOpenDialog(true)} */}
                          </>
                        )}

                        {step === "otp" && "Enter the OTP sent to your email."}
                        {step === "newPass" &&
                          "Enter your new password to reset."}
                      </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4">
                      {/* Step: Verify Email */}
                      {step === "verify" && (
                        <>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              className="col-span-3"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <Button
                            type="button"
                            className="w-full mt-2 bg-blue-800 text-white"
                            onClick={handleSendVerificationCode}
                          >
                            Send Verification Code
                          </Button>
                        </>
                      )}

                      {/* Step: Enter OTP */}
                      {step === "otp" && (
                        <>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="otp" className="text-right">
                              OTP
                            </Label>
                            <div className="col-span-3 flex space-x-2">
                              {Array.from({ length: 4 }).map((_, index) => (
                                <Input
                                  key={index}
                                  id={`otp-${index}`}
                                  name={`otp-${index}`}
                                  type="text"
                                  maxLength={1}
                                  className="w-10 text-center"
                                  value={otp[index] || ""}
                                  onChange={(e) => {
                                    const newOtp = otp.split("");
                                    newOtp[index] = e.target.value;
                                    setOtp(newOtp.join(""));
                                  }}
                                  required
                                />
                              ))}
                            </div>
                          </div>
                          <Button
                            type="button"
                            className="w-full mt-2 bg-blue-800 text-white"
                            onClick={handleVerifyOtp}
                          >
                            Verify OTP
                          </Button>
                        </>
                      )}

                      {/* Step: Reset Password */}
                      {step === "newPass" && (
                        <>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="new-password"
                              className="text-right"
                            >
                              New Password
                            </Label>
                            <Input
                              id="new-password"
                              name="new-password"
                              type="password"
                              placeholder="Enter new password"
                              className="col-span-3"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                          </div>
                          <Button
                            type="button"
                            className="w-full mt-2 bg-blue-800 text-white"
                            onClick={handleResetPassword}
                          >
                            Reset Password
                          </Button>
                        </>
                      )}
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <span
                className="m-1 text-blue-400 hover:underline cursor-pointer"
                onClick={() => setIsLoginForm(false)}
              >
                Register
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl mb-4 text-center font-semibold">
              Register Now
            </h1>
            <form onSubmit={onRegister} className="space-y-4">
              <div>
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="Name"
                  name="Name"
                  type="text"
                  value={data.Name}
                  onChange={onValueChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={onValueChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={onValueChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-2 py-2 text-white rounded-full w-full bg-blue-800 p-2 hover:text-black border border-blue-500 hover:bg-blue-100"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <span
                className="m-1 text-blue-400 hover:underline cursor-pointer"
                onClick={() => handleLoginClick()}
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
