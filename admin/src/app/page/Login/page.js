"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { UserContext } from "../../../context/AuthContext.js";

const axiosInstance = axios.create({
  baseURL: "https://api.mrandmrsperfecttrips.in",
  withCredentials: true,
});

export { axiosInstance };

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error("Please fill all the fields");
      }
      const response = await axiosInstance.post("/api/v1/auth/admin/Login", {
        email,
        password,
      });
      setUser(response.data);
      router.push("/page/dashboard");
      return toast.success("Login Successfully");
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        console.error("Login failed:", error.response?.data || error.message);
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
