import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import KarateImage from "@/img/karate.jpg";
import judoImage from "@/img/judo.jpg";
import { ShoppingBasket } from "lucide-react";
import axios from "axios";
const FeatureCategory = ({ id }) => {
  // Sample products data
  // const products = [
  //   { id: 1, name: 'Karate Gi', price: 100, image: judoImage },
  //   { id: 2, name: 'Judo Gi', price: 120, image: judoImage },
  //   { id: 3, name: 'Taekwondo', price: 150, image: judoImage },
  //   { id: 4, name: 'Judo Belt', price: 30, image: judoImage},
  // ];

  const [mainCategory, setMainCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const getMainCategory = async () => {
    if (id) {
      try {
        const { data } = await axios.get(
          `https://api.mrandmrsperfecttrips.in/api/v1/products/mainCategory/${id}`,
          {
            withCredentials: true,
          }
        );

        setMainCategory(data?.msg);
        try {
          const { data } = await axios.get(
            `https://api.mrandmrsperfecttrips.in/api/v1/products/productsFinal?limit=4`
          );
          setProducts(data?.msg);
        } catch (error) {
          console.log("product fetched error", error.message);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    } else {
      try {
        const { data } = await axios.get(
          `https://api.mrandmrsperfecttrips.in/api/v1/products/mainCategory`,
          {
            withCredentials: true,
          }
        );

        setMainCategory(data?.msg[0]);
        try {
          const { data } = await axios.get(
            `https://api.mrandmrsperfecttrips.in/api/v1/products/productsFinal/active-feature-product`
          );
          setProducts(data?.msg);
        } catch (error) {
          console.log("product fetched error", error.message);
        }
      } catch (error) {
        console.log("error", error.message);
      }
    }
  };
  useEffect(() => {
    getMainCategory();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 ">
      {/* Category Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-blue mb-4 gap-4">
        Our Products
      </h2>

      {/* Category and Featured Products Section */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-8">
        {/* Category Image Section */}
        <div className="relative sm:w-1/2 md:w-1/3 mb-6 sm:mb-0">
          {/* Category Image */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            {mainCategory?.image && (
              <Image
                src={mainCategory.image}
                alt="Category"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-300 transform hover:scale-110"
                width={400}
                height={400}
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-end text-white p-4">
              <h3 className="text-xl sm:text-2xl font-semibold">
                {mainCategory?.name}
              </h3>
              <Link href={"/shop"}>
                <Button className="mt-4 bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors flex items-center">
                  View More
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="sm:w-1/2 md:w-2/3">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-dark-blue mb-4 ml-2">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Product Cards */}
            {products.map((product) => (
              <div
                key={product?._id}
                className="relative group rounded-md overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={product?.images[0]}
                  alt={product.name}
                  className="w-full h-[200px] sm:h-[100px] md:h-[200px] object-cover transition-transform duration-300 transform group-hover:scale-110"
                  width={200}
                  height={250}
                />

                <div className="flex flex-col items-center justify-between p-4 bg-white">
                  <div className="text-lg lg:text-2xl font-semibold text-dark-blue line-clamp-1">
                    {product.name}
                  </div>
                  <div className="text-black">
                    ₹{product?.variant[0].finalPrice}
                  </div>
                </div>
                <div className="border flex justify-center items-center bg-blue-800 text-white w-full">
                  <Link className="" href={`/product/${product._id}`}>
                    {/* <span>Buy Now</span> */}
                    <Button className="font-semibold bg-blue-800 hover:bg-blue-800  text-sm md:text-sm justify-center items-center">
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCategory;
