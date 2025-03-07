// src/app/page/user/user-page.js
'use client';

import React, { use, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'; // Used for routing after actions
import { axiosInstance } from '../Login/page';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter(); // For routing after actions


  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Store updated list in localStorage
    toast.success("User deleted successfully!");
  };

  const handleEdit = (user) => {
    router.push(`/page/user/add-user?id=${user.id}`); // Redirect to Add User page with the user id
  };

  const handleAddUser = () => {
    router.push('/page/user/add-user'); // Navigate to Add User page
  };


  const fetchAllUser=async()=>{
    try {
      const response = await axiosInstance.get("/api/v1/auth/get-all-users");
      console.log("response", response);
      
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-2">
        <h1 className="text-2xl font-bold mb-4">User List</h1>

        {/* Add User Button */}
        <Button variant="outline" onClick={handleAddUser} className="mb-4">
          Add User
        </Button>
      </div>

      {/* User Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Role</th>
              
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.Name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user?.phone ? user.phone : "N/A"}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">No users available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
