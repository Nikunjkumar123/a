"use client"
import { LogOut, User } from "react-feather";
import Link from "next/link";
import { ShoppingCart, List, Package, Edit3, Image } from "react-feather";
import React, { useContext, useEffect, useState } from "react";
import { CandyIcon } from "lucide-react";
import { axiosInstance } from "@/app/page/Login/page";
import { useRouter } from "next/navigation";
import {UserContext} from "../../context/AuthContext"
function HeaderWithSidebar({ children }) {
const router=useRouter()

const {user,setUser}=useContext(UserContext)

  // const [user, setUser] = useState(false);
  // const fetchUser = async () => {
  //   try { 
  //     const response = await axiosInstance.get("/api/v1/auth/check");
  //     console.log("fetched User",response.data);
  //     setUser(response.data);
  //   } catch (error) {
  //     setUser(null);
  //   }
  // };
  // useEffect(() => {
  //   fetchUser();
  // }, []);

const handleLogout = async () => {
  try { 
    let userEmail=user?.userId?.email
    if(!userEmail){
      console.log("user not logged in");
      
      return null
    }
    await axiosInstance.post("/api/v1/auth/Logout",{"userEmail":userEmail});
    setUser((prev) => !prev);
   router.push("/page/Login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white fixed left-0 top-0 h-full border border-r-white">
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/page/dashboard"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <ShoppingCart size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/page/order"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <ShoppingCart size={20} />
                <span>Order </span>
              </Link>
            </li>
            <li>
              <Link
                href="/page/Category"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <List size={20} />
                <span>Category</span>
              </Link>
            </li>

            <li>
              <Link
                href="/page/sub-category"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <List size={20} />
                <span>Sub Category</span>
              </Link>
            </li>

            <li>
              <Link
                href="/page/product"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <Package size={20} />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                href="/page/blog"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <Edit3 size={20} />
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link
                href="/page/banner"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <Image size={20} />
                <span>Banners</span>
              </Link>
            </li>

            <li>
              <Link
                href="/page/user"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <User size={20} />
                <span>Users</span>
              </Link>
            </li>

            <li>
              <Link
                href="/page/coupon"
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
              >
                <CandyIcon size={20} />
                <span>Coupon</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-purple-500 text-white">
          <div className="flex p-2 md:p-4 justify-between items-center border-b border-white shadow-md">
            {/* Left section */}
            <div className="flex-1 md:hidden">
              <Link href="/page/dashboard" className="text-white font-bold">
                Aikon Sports
              </Link>
            </div>

            {/* Middle section */}
            <div className="flex-1 text-center">
              <span className="text-sm md:text-3xl font-bold uppercase">
                Aikon Sports
              </span>
            </div>

            {/* Right section (Icons) */}
            <div className="flex-1 flex justify-end items-center space-x-4">
              <User className="w-4 md:w-6 h-6" />
              <LogOut className="w-4 md:w-6 h-6 cursor-pointer" onClick={() => handleLogout()} />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default HeaderWithSidebar;
