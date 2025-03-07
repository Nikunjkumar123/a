"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import SubCategorySidebar from "@/components/subCategorySidebar/page";
import heroImage from "@/img/hero-img.jpg";
import { axiosInstance } from "../account/page";
import { toast } from "sonner";

const Shop = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryNames, setCategoryNames] = useState(["All"]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mainCategory } = useParams() || {};
  
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  const fetchMainCategory = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/products/mainCategory?limit=5");
      const categories = response?.data?.msg?.map((category) => category.name) || [];
      setCategoryNames(["All", ...categories]);
    } catch (error) {
      toast.error("Failed to load categories.");
    }
  };

  const getAllProducts = async () => {
    try {
      const url = mainCategory
        ? `/api/v1/productFinal/search?mainCategory=${mainCategory}`
        : "https://api.mrandmrsperfecttrips.in/api/v1/products/productsFinal";
      const { data } = await axiosInstance.get(url, { withCredentials: true });
      setProducts(data?.msg || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchMainCategory();
    getAllProducts();
  }, [mainCategory]);

  return (
    <div className="flex flex-col items-center mt-24 min-h-screen">
      <div className="relative flex flex-col w-full bg-gradient-to-r from-blue-800 to-blue-50 text-white">
        <div className="relative z-10 flex items-center justify-between px-4 py-4 md:px-8">
          <h1 className="text-2xl font-bold hover:border-b-2 border-red-800 transition-all duration-300">Shop</h1>
          <div className="md:hidden">
            {menuOpen ? <X className="h-8 w-8 cursor-pointer" onClick={() => setMenuOpen(false)} /> : <Menu className="h-8 w-8 cursor-pointer" onClick={() => setMenuOpen(true)} />}
          </div>
          <div className="hidden md:flex space-x-4">
            {categoryNames.map((category) => (
              <button
                key={category}
                className={`text-xl font-semibold transition-all ${selectedCategory === category ? "text-red-500" : "text-white hover:text-red-500"}`}
                onClick={() => {
                  setSelectedCategory(category);
                  router.push(category === "All" ? "/shop" : `/shop?mainCategory=${category}`);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-4 px-6 py-4 text-white bg-blue-800 bg-opacity-90">
            {categoryNames.map((category) => (
              <button
                key={category}
                className="text-xl font-semibold hover:underline"
                onClick={() => {
                  setSelectedCategory(category);
                  router.push(category === "All" ? "/shop" : `/shop?mainCategory=${category}`);
                  setMenuOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        <div className="absolute inset-0">
          <Image src={heroImage} alt="Background" layout="fill" objectFit="cover" className="opacity-40" />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 hidden md:block">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <SubCategorySidebar />
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-dark-blue">Our Products</h2>
              <p className="text-lg text-gray-600">Explore our range of training gear</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product?._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <Image src={product?.images?.[0] || "/default-image.jpg"} alt={product?.name} width={300} height={300} className="w-full h-[200px] md:h-[250px] object-cover rounded-lg" />
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{product?.name}</h2>
                      <p className="text-blue-800 font-bold text-xl mt-2">₹{product?.variant?.[0]?.finalPrice}</p>
                      <button
                        onClick={() => router.push(`/product/${product?._id}`)}
                        className="w-full py-2 px-4 rounded-lg border-2 border-blue-800 hover:bg-blue-800 hover:text-white text-blue-800 font-semibold transition-colors duration-300"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-12">
                  <p className="text-gray-500 text-lg">No products available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
