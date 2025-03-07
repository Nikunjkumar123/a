"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import banner1 from "@/img/banner1.png";
import banner2 from "@/img/banner2.png";
import { axiosInstance } from "@/app/account/page";

export const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banner, setBanner] = useState([]);
  // Set interval to auto-slide the carousel every second

  const fetchBanners = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/Banners");
      setBanner(data?.msg);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 2); // Assuming there are 2 images
    }, 1000); // Change the slide every 1000ms (1 second)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    fetchBanners();
  }, []);
  return (
    <div className="flex">
      <div className="mt-20 w-full justify-center items-center relative  overflow-hidden">
        <Carousel className="w-full" index={currentIndex}>
          <CarouselContent>
            {banner && banner.length > 0 ? (
              banner.map((banner) => {
                return (
                  <CarouselItem key={banner?._id}>
                    <Image
                      src={banner.image}
                      alt={banner.name}
                      className="w-full h-auto object-cover"
                      width={1920}
                      height={1080}
                    />
                  </CarouselItem>
                );
              })
            ) : (
              <>
                <CarouselItem>
                  <Image
                    src={banner1}
                    alt="banner1"
                    className="w-full h-auto object-cover"
                    width={1920}
                    height={1080}
                  />
                </CarouselItem>
                <CarouselItem>
                  <Image
                    src={banner2}
                    alt="banner2"
                    className="w-full h-auto object-cover"
                    width={1920}
                    height={1080}
                  />
                </CarouselItem>
              </>
            )}

            <CarouselItem>
              <Image
                src={banner1}
                alt="banner1"
                className="w-full h-auto object-cover"
                width={1920}
                height={1080}
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={banner2}
                alt="banner2"
                className="w-full h-auto object-cover"
                width={1920}
                height={1080}
              />
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-none" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-none" />
        </Carousel>
      </div>
    </div>
  );
};
