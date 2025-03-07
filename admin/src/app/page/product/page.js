"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { axiosInstance } from "../Login/page";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Fetch products from localStorage

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://api.mrandmrsperfecttrips.in/api/v1/products/productsFinal"
      );
      setProducts(res.data.msg);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(
        `api/v1/products/productsFinal/${id}`
      );
      if (response.status === 200) {
        toast.success("product deleted successfully!");
        await fetchProducts();
      }
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/page/product/add-product?id=${id}`); // Redirect to Edit Product page with the product ID
  };

  // Navigate to Add Product page
  const handleAddProduct = () => {
    router.push("/page/product/add-product"); // Redirect to Add Product page
  };

  // Format price as currency
  const formatPrice = (price) => {
    // Ensure price is a valid number and format it with a currency symbol
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) return "N/A";
    return parsedPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>

        {/* Add Product Button */}
        <Button variant="outline" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b text-sm text-center">
                    {product.name}
                  </td>
                  <td className="py-2 px-4 border-b text-sm text-center">
                    {product?.mainCategory?.name}
                  </td>

                  <td className="py-2 px-4 border-b ">
                    {product.images ? (
                      <img
                        src={product?.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <img
                        src="/placeholder-image.jpg" // Placeholder image path
                        alt="Placeholder"
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    className="py-2 px-4 border-b text-sm text-center"
                  ></td>

                  <td className="py-2 px-4 border-b">
                    <Button
                      onClick={() => handleEdit(product?._id)}
                      size="sm"
                      variant="outline"
                      className="mr-2"
                    >
                      <Edit2Icon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(product?._id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-4 text-center text-sm">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;
