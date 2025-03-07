import { axiosInstance } from "@/app/account/page";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const fetchUser = async () => {
    try { 
      const response = await axiosInstance.get("/api/v1/auth/check");
      // console.log("fetched User",response.data);
      console.log("fetched User",response.data);
      
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // Logout function
  const logout = async () => {
    try { 
      let userEmail=user?.userId?.email
      if(!userEmail){
        console.log("user not logged in");
        
        return null
      }
      await axiosInstance.post("/api/v1/auth/Logout",{"userEmail":userEmail});
      setUser((prev) => !prev);
      localStorage.clear();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <UserContext.Provider value={{ user,fetchUser, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
