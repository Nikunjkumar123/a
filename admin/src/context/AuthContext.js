"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "@/app/page/Login/page";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on app load
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/check");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      let userEmail = user?.userId?.email;
      if (userEmail) {
        await axiosInstance.post("/api/v1/auth/logout", { userEmail });
        setUser(null);
        console.log("called logout in contextjs");
        
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    console.log("user");
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser, logout,setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// export const useAuth = () => useContext(UserContext);
