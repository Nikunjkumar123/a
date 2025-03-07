// src/app/page/banner/add-banner.js
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { axiosInstance } from "../../Login/page";

const AddBannerPage = () => {
  const [bannerTitle, setBannerTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);

  const [editingBanner, setEditingBanner] = useState(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setBannerImage(file);
    }
  };

  const handleSaveBanner = async (e) => {
    e.preventDefault();
    if (!bannerTitle || !bannerImage) {
      alert("Please provide  name and an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", bannerTitle);
    formData.append("image", bannerImage);

    if (id) {
      try {
        setDisabled(true);
        const res = await axiosInstance.patch(
          `/api/v1/Banners/${id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res) {
          router.push("/page/banner");
          toast.success("Banner updated successfully!");
          setDisabled((prev)=> !prev)
        }
      } catch (error) {
        console.error(
          "Failed to update banner:",
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.message || "Failed to update sub category!"
        );
      }
    } else {
      try {
        setDisabled(true);
        const addingBanner = toast.loading("Adding banner...");
        await axiosInstance.post("/api/v1/Banners", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.dismiss(addingBanner);
        router.push("/page/banner");
        toast.success("Banner added successfully!");
        setDisabled((prev)=> !prev)

      } catch (error) {
        toast.dismiss();
        console.error(
          "Failed to add banner:",
          error.response?.data || error.message
        );
        toast.error(error.response?.data?.msg || "Failed to add sub category!");
      }
    }
  };

  const getBannerDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/Banners/${id}`);
      console.log("response", response);

      setBannerTitle(response.data.msg.name);
      setBannerImage(response.data.msg.image);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getBannerDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Banner" : "Add Banner"}
      </h2>

      <form onSubmit={handleSaveBanner} className="space-y-4">
        <div>
          <Label htmlFor="bannerTitle">Banner Title</Label>
          <Input
            id="bannerTitle"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="bannerImage">Banner Image (Upload Image)</Label>
          <Input
            id="bannerImage"
            type="file"
            onChange={handleBannerImageChange}
            required={id ? false : true}
          />
        </div>

        <div className="gap-2">
          <Button type="submit" disabled={disabled}>
            {editingBanner ? "Update Banner" : "Add Banner"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/page/banner")} >
            Back to Banner List
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBannerPage;
