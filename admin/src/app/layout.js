"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWithSidebar from "@/components/header/page";
import { useEffect, useState } from "react";
import { axiosInstance } from "./page/Login/page";
import { UserProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const fetchUser = async () => {
    try {
      console.log("fetchuser in logout");
      
      const response = await axiosInstance.get("/api/v1/auth/check");
      console.log("response",response)
      if(response.data.loggedIn==true){
        setIsUserLoggedIn(response.data);
      }else{
        alert('somthing wrong')
      }
      console.log("response data",response?.data);
      
     
    } catch (error) {
      setIsUserLoggedIn(null);
    }
  };
  useEffect(() => {
    fetchUser();
    console.log("yes");
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isUserLoggedIn ? (
          <UserProvider>
            <HeaderWithSidebar>{children}</HeaderWithSidebar>
          </UserProvider>
        ) : (
          <><UserProvider>{children}</UserProvider></>
        )}

        {/* <HeaderWithSidebar>
          {children}
        </HeaderWithSidebar> */}
      </body>
    </html>
  );
}
