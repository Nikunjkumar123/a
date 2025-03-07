"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import SubCategorySidebar from "@/components/subCategorySidebar/page";
import { StarIcon } from "@heroicons/react/20/solid";
import heroImage from "@/img/hero-img.jpg";
import { axiosInstance } from "../account/page";
import { toast } from "sonner";

// const renderStars = (count) =>
//   Array.from({ length: count }, (_, i) => (
//     <StarIcon key={i} className="h-5 w-5 text-yellow-500 inline" />
//   ));

const Shop = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [price, setPrice] = useState(100000);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryNames, setCategoryNames] = useState(["All"]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { mainCategory } = useParams();
  // const mainCategory=searchParams.get("mainCategory")
  const subCategory = searchParams.get("subCategory");

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      console.log("this", categoryFromUrl);
    }
  }, [searchParams]);

  const getAllProducts = async () => {
    if (mainCategory) {
      try {
        const { data } = await axiosInstance.get(
          "/api/v1/productFinal/search?mainCategory=" + mainCategory
        );
        setProducts(data || []);
      } catch (error) {
        console.log("error:", error.message);
      }
    } else {
      try {
        const { data } = await axios.get(
          "https://api.mrandmrsperfecttrips.in/api/v1/products/productsFinal",
          { withCredentials: true }
        );
        setProducts(data.msg || []);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    }
  };
  // let categoryNames = ["All"];
  const fetchMainCategory = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/products/mainCategory?limit=5"
      );
      const categories = response?.data?.msg || [];
      let categoryData = [];
      categories.forEach((category) => {
        categoryData.push(category.name);
      });
      setCategoryNames([...categoryNames, ...categoryData]);
    } catch (error) {
      toast.error("Failed to load categories.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMainCategory();
    getAllProducts();
  }, []);

  return (
    <div className="flex flex-col items-center mt-24 min-h-screen">
      <div className="relative flex flex-col w-full bg-gradient-to-r from-blue-800 to-blue-50 text-white">
        <div className="relative z-10 flex items-center justify-between px-4 py-4 md:px-8">
          <h1 className="text-2xl font-bold hover:border-b-2 border-red-800 transition-all duration-300">
            Shop
          </h1>
          <div className="md:hidden">
            {menuOpen ? (
              <X
                className="h-8 w-8 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <Menu
                className="h-8 w-8 cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
          <div className="hidden md:flex space-x-4">
            {categoryNames &&
              categoryNames.length > 1 &&
              categoryNames.map((category) => (
                <button
                  key={category}
                  className={`text-xl font-semibold transition-all ${
                    selectedCategory === category
                      ? "text-red-500"
                      : "text-white hover:text-red-500"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    if (category === "All") {
                      router.push(`/shop`, {
                        scroll: false,
                      });
                    } else {
                      router.push(`/shop/maincategory=${category}`, {
                        scroll: false,
                      });
                    }
                  }}
                >
                  {category}
                </button>
              ))}
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-4 px-6 py-4 text-white bg-blue-800 bg-opacity-90">
            {categoryNames &&
              categoryNames.length > 1 &&
              categoryNames.map((category) => (
                <button
                  key={category}
                  className="text-xl font-semibold hover:underline"
                  onClick={() => {
                    setSelectedCategory(category);
                    if (category === "All") {
                      router.push(`/shop`, {
                        scroll: false,
                      });
                      setMenuOpen(false);
                    } else {
                      router.push(`/shop/maincategory=${category}`, {
                        scroll: false,
                      });
                      setMenuOpen(false);
                    }
                  }}
                >
                  {category}
                </button>
              ))}
          </div>
        )}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-40"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 md:sticky md:top-24 md:h-screen overflow-y-auto hidden md:block">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              {/* <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Price Filter
                </h3>
                <label
                  htmlFor="price-range"
                  className="block text-gray-700 mb-2"
                >
                  Price Range: ₹100 - ₹1,00,000
                </label>
                <input
                  type="range"
                  id="price-range"
                  min="100"
                  max="100000"
                  step="10"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>₹100</span>
                  <span>₹{price}</span>
                </div>
              </div> */}
              <SubCategorySidebar />
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-dark-blue">
                Our Products
              </h2>
              <p className="text-lg text-gray-600">
                Explore our range of training gear
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <Image
                      src={product?.images?.[0] || "/default-image.jpg"}
                      alt={product?.name}
                      width={300}
                      height={300}
                      className="w-full h-[200px] md:h-[250px] object-cover rounded-lg"
                    />
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {product?.name}
                      </h2>
                      <p className="text-blue-800 font-bold text-xl mt-2">
                        ₹{product?.variant[0].finalPrice}
                      </p>
                      {/* <div className="my-2">{renderStars(5)}</div> */}
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
                  <p className="text-gray-500 text-lg">
                    No products available.
                  </p>
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
