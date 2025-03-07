"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { StepBackIcon } from "lucide-react";
import { toast } from "sonner";

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();
  // const { id } = router?.query;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Access individual query parameters:

  // Handle form submission
  const handleSaveCategory = async (e) => {
    e.preventDefault();

    if (!categoryName || !imageFile) {
      alert("Please provide both a name and an image.");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", imageFile);

    if (id) {
      try {
        const response = await axios.patch(
          `https://api.mrandmrsperfecttrips.in/api/v1/products/mainCategory/${id}`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        router.push("/page/Category");
      } catch (error) {
        console.error(
          "Failed to add category:",
          error.response?.data || error.message
        );
        toast.error(error.response?.data?.message || "Failed to add category!");
      }
    } else {
      try {
        // Send the form data to the backend
        const response = await axios.post(
          "https://api.mrandmrsperfecttrips.in/api/v1/products/mainCategory",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Category added:", response.data);
        router.push("/page/Category");
      } catch (error) {
        console.error(
          "Failed to add category:",
          error.response?.data || error.message
        );
      }
    }
  };

  const getCategoryDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.mrandmrsperfecttrips.in/api/v1/products/mainCategory/${id}`,
        { withCredentials: true }
      );
      setCategoryName(response.data.msg.name);
      setImageFile(response.data.msg.image);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    getCategoryDetails();
  }, [id]);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Update" : "Add"} Category
      </h2>

      <form onSubmit={handleSaveCategory}>
        <div className="space-y-4">
          {/* Category Name Input */}
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          {/* Image Upload Input */}
          <div>
            <Label htmlFor="image">Category Image</Label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:bg-gray-100 file:text-gray-700 file:hover:bg-gray-200"
              required={id ? false : true}
            />
          </div>

          {/* Action Buttons */}
          <div className="gap-2 flex">
            <Button type="submit" variant="outline">
              {id ? "Update" : "Add"} Category
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/page/Category")}
            >
              <StepBackIcon /> Back to Category List
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
