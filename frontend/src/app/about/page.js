'use client'
import Image from 'next/image'
import bannerImage from '../../img/banner1.png'
import BlogCard from '../blog/page';
import AboutImage from '@/img/aboutImage.jpg'
import Link from 'next/link';
import Head from 'next/head';

export default function About() {
  return (

    <>
<Head>
  <title>About Us | Aikon Sports</title>
  <meta name="description" content="Learn more about Aikon Sports, a brand dedicated to providing high-quality sports equipment and apparel for athletes." />
  <meta name="robots" content="index, follow" />

  {/* Open Graph Meta Tags */}
  <meta property="og:title" content="About Us | Aikon Sports" />
  <meta property="og:description" content="Learn more about Aikon Sports, a brand dedicated to providing high-quality sports equipment and apparel for athletes." />
  <meta property="og:image" content="/img/og-image.jpg" />  {/* Image should be inside 'public' folder */}
  <meta property="og:url" content="https://www.aikonsports.com/about" />

  {/* Twitter Meta Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="About Us | Aikon Sports" />
  <meta name="twitter:description" content="Learn more about Aikon Sports, a brand dedicated to providing high-quality sports equipment and apparel for athletes." />
  <meta name="twitter:image" content="/img/og-image.jpg" />  {/* Same here, image inside public folder */}
</Head>

    <div className='mt-20'>
      {/* Top Banner */}
      <div className="relative w-full h-64">
        <Image
          src={AboutImage}
          alt="About Us Banner"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-end pb-4">
          <h1 className="text-5xl text-white font-bold mb-2">About Us</h1>
          <p className='text-white font-semibold'>
            <Link className='hover:text-blue-800' href={'/'}>Home</Link> / About Us
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg mb-4">
          Welcome to Aikon Sports! We are dedicated to providing the best sports equipment and apparel for athletes of all levels. Our mission is to inspire and empower individuals to achieve their fitness goals.
        </p>
        <p className="text-lg mb-4">
          At Aikon Sports, we believe in quality, innovation, and customer satisfaction. Our products are designed with the latest technology and highest standards to ensure you get the best performance and durability.
        </p>
        <p className="text-lg mb-4">
          Thank you for choosing Aikon Sports. We are here to support you on your fitness journey.
        </p>
      </div>

      {/* Blog Section */}
      <BlogCard />
    </div>
    
    </>

  );
}
