"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditIcon, TrashIcon } from "lucide-react";
import { axiosInstance } from "../Login/page";

const ShowCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Fetch categories
  const getDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/products/mainCategory");
      setCategories(response.data.msg);
    } catch (error) {
      toast.error("Failed to load categories.");
      console.error(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(`/api/v1/products/mainCategory/${categoryId}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        // Remove the deleted category from the state
        setCategories((prev) => prev.filter((category) => category._id !== categoryId));
      }
    } catch (error) {
      toast.error("Failed to delete category.");
      console.error(error);
    }
  };

  // Handle edit category
  const handleEditCategory = (categoryId) => {
    router.push(`/page/Category/add-category?id=${categoryId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-6 flex">
        <h2 className="text-2xl font-bold mb-4 flex-1">Categories</h2>
        <Button onClick={() => router.push("/page/Category/add-category")}>
          Add New Category
        </Button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories?.length === 0 ? (
          <div>No categories available.</div>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="border p-4 rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <img
                  src={category.image || "/default-image.jpg"}
                  alt={category.name}
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>

              <div className="mt-4 flex justify-between gap-2">
                <Button variant="outline" onClick={() => handleEditCategory(category._id)}>
                  <EditIcon className="mr-2" /> Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteCategory(category._id)}
                  className="text-red-600 hover:bg-red-100"
                >
                  <TrashIcon className="mr-2" /> Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowCategoriesPage;
