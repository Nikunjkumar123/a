import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import TaekwondoImage from "@/img/taekwondo.jpg";
import karateImage from "@/img/karate.jpg";
import judoImage from "@/img/judo.jpg";
import TraningImage from "@/img/training.jpg";
import axios from "axios";

const Category = () => {
  const [categories, setCategory] = useState();
  // const categories = [
  //   {
  //     name: 'Taekwondo',
  //     image: TaekwondoImage,
  //     icon: <TrophyIcon className="h-8 w-8" />,
  //     description: 'Discover our Taekwondo equipment collection',
  //     href: '/shop?category=Taekwondo'
  //   },
  //   {
  //     name: 'Karate',
  //     image: karateImage,
  //     icon: <ShieldCheckIcon className="h-8 w-8" />,
  //     description: 'Explore premium Karate gear',
  //     href: '/shop?category=Karate'
  //   },
  //   {
  //     name: 'Judo',
  //     image: judoImage,
  //     icon: <UserGroupIcon className="h-8 w-8" />,
  //     description: 'Professional Judo equipment',
  //     href: '/shop?category=Judo'
  //   },
  //   {
  //     name: 'Training',
  //     image: TraningImage,
  //     icon: <AcademicCapIcon className="h-8 w-8" />,
  //     description: 'Essential training equipment',
  //     href: '/shop?category=Training Equipment'
  //   }
  // ]
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://api.mrandmrsperfecttrips.in/api/v1/products/mainCategory?limit=4",
        { withCredentials: true }
      );
      setCategory(data.msg);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="px-4 py-4 flex items-center justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center uppercase mb-6 hover:text-blue-800">
          Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories?.map((category, index) => (
          <Link href={`/shop/maincategory=${category.name}`} key={index}>
            <div className="relative group h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-lg">
              <Image
                src={category?.image}
                alt={category?.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                width={450}
                height={450}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent  transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    {category.icon}
                    <h3 className="text-lg sm:text-xl font-bold">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-200">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
