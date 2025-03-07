import React from 'react';
import Image from 'next/image';
import heroImage from '../../img/hero-img.jpg';
import bannerImage from '../../img/judo.jpg';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <div className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[500px]">
        <Image
          src={heroImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-blue bg-opacity-50 flex flex-col items-center justify-center px-6 sm:px-8 md:px-16 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold text-center">
            Best Deal Up to <span className="text-red-800">70% Off</span> All Judo & Taekwondo Equipments
          </h1>
          <Link href={'/shop'}>
            <button className="rounded-lg bg-white text-dark-blue hover:bg-red-600 hover:text-white transition-all px-6 py-3 transform hover:translate-x-2">
              Explore More
            </button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto mt-10 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center">
        <div className="sm:w-1/2 md:w-1/2 mb-6 sm:mb-0">
          <Image
            className="rounded-lg w-full"
            src={bannerImage}
            width={1000}
            height={400}
            alt="Banner"
          />
        </div>
        <div className="sm:w-1/2 text-left px-6 py-6 sm:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-dark-blue mb-2">
            About AIKON SPORTS
          </h2>
          <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-4">
            Welcome to AIKON SPORTS, the trusted destination for high-quality martial arts apparel. Our mission is to empower Karate, Judo, and Taekwondo enthusiasts with expertly designed uniforms that blend exceptional craftsmanship, durability, and style.
          </p>
          <Link href={'/shop'}>
            <button className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
