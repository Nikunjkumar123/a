"use client";
import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn components
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Input } from "@/components/ui/input"; // Shadcn Input
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import Image from "next/image";
import KarateImage from "@/img/karate.jpg";
import { Radius } from "lucide-react";
import { axiosInstance } from "../account/page";
import { UserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
const Profile = () => {
    const router = useRouter();
  const {user:isUserExist}=useContext(UserContext)
  let DefaultData={
    Name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  }
  const [user, setUser] = useState(DefaultData);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const { logout } = useContext(UserContext);
  const LogoutUser = async () => {
    await logout();
    setUser(DefaultData)
    router.push("/"); // This works!
    toast.success("Logout successfully.");
  };

  const showDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/myprofile/myProfile",{withCredentials:true});
      console.log("response", response);  
      setUser(response.data.message);
      formData.Name=response.data.message?.Name || ""
      formData.email=response.data.message?.email || ""
      formData.phone=response.data.message?.phone || ""
      formData.address=response.data.message?.address  || ""
      formData.bio=response.data.message?.bio || ""
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showDetails();
    // if (isUserExist) {
    // }else{
    //   // router.push("/account")
    // }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async(e) => {
    e.preventDefault();
    try {
      if(!formData.Name || !formData.email || !formData.phone || !formData.address || !formData.bio){
        return toast.error("Please fill all the fields");
      }
      
      if(formData.phone.length !== 10){
        return toast.error("Please enter a valid phone number");
      }
      const response = await axiosInstance.patch("/api/v1/myprofile/myProfile",{
        name:formData.Name,
        phone:formData.phone,
        address:formData.address,
        bio:formData.bio
      });
      setUser(response.data.message);
      router.push("/profile")
    } catch (error) {
      console.log(error);
    }
    setUser(formData);
    setEditMode(false);
  };


  
  return (
    <div className="mt-24">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl  mx-auto">
          <Card className="">
            <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-semibold py-4">
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!editMode ? (
                <div className="flex">
                  <div className="w-1/2">
                    <div className="mb-6">
                      <h2 className="text-gray-700 font-medium">Name:</h2>
                      <p className="text-lg text-gray-900">{user?.Name}</p>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-gray-700 font-medium">Email:</h2>
                      <p className="text-lg text-gray-900">{user?.email}</p>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-gray-700 font-medium">Phone:</h2>
                      <p className="text-lg text-gray-900">{user?.phone}</p>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-gray-700 font-medium">Address:</h2>
                      <p className="text-lg text-gray-900">{user?.address}</p>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-gray-700 font-medium">Bio:</h2>
                      <p className="text-lg text-gray-900">{user?.bio}</p>
                    </div>
                    <div className="mb-6 flex gap-5 items-center">
                      <h2 className="text-gray-700 font-medium">Orders:</h2>
                     <Link href="/order"><button className="text-white hover:bg-green-400 bg-green-500 px-2 py-2 rounded-md">View Orders</button></Link>
                    </div>
                    <Button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-600 hover:bg-blue-500"
                    >
                      Edit Profile
                    </Button>
                    <Button
                      onClick={() => LogoutUser()}
                      className="bg-red-600 ml-5 hover:bg-blue-500"
                    >
                      logout
                    </Button>
                  </div>
                  {/* <div className="w-1/2 flex justify-center items-start">
                    <Image
                      src={KarateImage}
                      alt="Karate"
                      style={{
                        borderRadius: "50%",
                        height: "350px",
                        width: "350px",
                        objectFit: "cover",
                      }}
                    />
                  </div> */}
                </div>
              ) : (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Name:
                    </label>
                    <Input
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email:
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone:
                    </label>
                    <Input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Address:
                    </label>
                    <Textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Bio:
                    </label>
                    <Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-500"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditMode(false)}
                      variant="secondary"
                      className="bg-gray-600 hover:bg-gray-500"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
