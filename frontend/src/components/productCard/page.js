// Product Listing Page
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import karateImage from "@/img/karate.jpg";
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductCard = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  // const products = Array.from({ length: 8 }, (_, i) => ({
  //   id: i + 1,
  //   name: `Product ${i + 1}`,
  //   price: 100,
  //   image: karateImage,
  // }));

  // const products2=[
  //   {
  //     name:'product1',
  //     price:100,
  //     category:'judo'
  //   }
  // ]
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://api.mrandmrsperfecttrips.in/api/v1/products/productsFinal/active-page`,
        { withCredentials: true }
      );
      setProducts(data.msg);
      // setCurrentImage(data)
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="container mx-auto mt-8 py-4 px-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center uppercase mb-6 hover:text-blue-800">
        Products
      </h2>
      <div className="container mx-auto px-2 py-2 grid grid-cols-2 md:grid-cols-4  gap-4">
        {products.length > 0 &&
          products.map((product) => (
            <div
              key={product._id}
              className="p- border rounded-md hover:shadow-lg transition"
            >
              <Image
                src={product?.images[0]}
                alt={product.name}
                onClick={() => router.push(`/product/${product?._id}`)}
                className="w-full h-[200px] md:h-[350px] object-cover"
                width={300}
                height={350}
              />
              <div className="p-2">
                <h2
                  className="text-lg justify-center font-semibold mt-2"
                  onClick={() => router.push(`/product/${product?._id}`)}
                >
                  {product.name}
                </h2>
                <p className=" text-blue-800 font-bold">
                  ₹{product?.variant[0].finalPrice}
                </p>
              </div>
              <button
                onClick={() => router.push(`/product/${product?._id}`)}
                className=" text-blue-800 w-full py-2 px-4 rounded border hover:bg-blue-800 hover:text-white"
              >
                Buy Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductCard;
