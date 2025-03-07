"use client";
import { useContext, useEffect, useState } from "react";
import Dashboard from "./page/dashboard/page";
import Login from "./page/Login/page";
import { useAuth } from "@/context/AuthContext.js";
import {UserContext} from '../context/AuthContext.js'
export default function Home() {
  // const { user, loading } = useAuth();

  // if (loading) return <div>Loading...</div>;


  // const [user, setUser] = useState(false);
  // const fetchUser = async () => {
  //   try { 
  //     const response = await axiosInstance.get("/api/v1/auth/check");
      
  //     setUser(response.data);
  //   } catch (error) {
  //     setUser(null);
  //   }
  // };
  // useEffect(() => {
  //   fetchUser();
  // }, []);

const {user}=useContext(UserContext)

  return <>{user?.userId?.userId ? <Dashboard /> : <Login />}</>;
}
