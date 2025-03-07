'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import blogImage1 from '@/img/karate.jpg';
import blogImage2 from '@/img/judo.jpg';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

// Blog data
const blogPosts = [
  {
    id: 1,
    title: 'Blog Title 1',
    description: 'Blog description goes here. Stay updated with the latest news and articles.',
    image: blogImage1,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra massa vel elit condimentum gravida.`,
    date: 'January 1, 2024',
    slug: '/blog/1',
  },
  {
    id: 2,
    title: 'Blog Title 2',
    description: 'Description for blog 2 goes here.',
    image: blogImage2,
    content: `Aliquam malesuada neque ut fermentum interdum. Morbi a gravida magna, ac hendrerit risus.`,
    date: 'January 2, 2024',
    slug: '/blog/2',
  },
  {
    id: 3,
    title: 'Blog Title 3',
    description: 'Blog description goes here. Stay updated with the latest news and articles.',
    image: blogImage1,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra massa vel elit condimentum gravida.`,
    date: 'January 3, 2024',
    slug: '/blog/3',
  },
  {
    id: 4,
    title: 'Blog Title 4',
    description: 'Blog description goes here. Stay updated with the latest news and articles.',
    image: blogImage2,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra massa vel elit condimentum gravida.`,
    date: 'January 4, 2024',
    slug: '/blog/4',
  },
];

const BlogCard = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active index for carousel

  // Handle carousel navigation
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
    );
  };

  // Get the previous and active blog (only two blogs will be shown)
  const getVisibleBlogs = () => {
    const prevIndex = (activeIndex - 1 + blogPosts.length) % blogPosts.length;
    const nextIndex = (activeIndex + 1) % blogPosts.length;
    return [prevIndex, activeIndex]; // Only showing two blog posts: previous and active
  };

  const visibleBlogs = getVisibleBlogs();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Our Blog - Stay Updated</title>
        <meta name="description" content="Stay updated with the latest news and articles on various topics. Read our blog to learn more." />
        <meta property="og:title" content="Our Blog" />
        <meta property="og:description" content="Stay updated with the latest news and articles." />
        <meta property="og:image" content="/path-to-image.jpg" />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 py-4 mt-24">
        {/* Blog Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-dark-blue">Our Blog</h1>
            <p className="text-lg sm:text-xl text-gray-600">Stay updated with the latest news and articles</p>
          </div>
        </div>

        {/* Blog Layout */}
        <div className="relative flex justify-center mx-3 ">
          {/* Left Side: Carousel */}
          <div className="lg:w-full relative w-full  ">
            <div className="overflow-hidden rounded-lg " >
              {/* Carousel Slides */}
              <div className="flex transition-transform  duration-500 ease-in-out space-x-4">
                {visibleBlogs.map((index) => {
                  const post = blogPosts[index];
                  return (
                    <div key={post.id} className="flex  flex-col shadow-xl items-center w-full border-spacing-2 ">
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-full h-[200px] md:h-[450px] object-cover rounded-t-lg"
                        width={1200}
                        height={450}
                      />
                      <div className="p-6 border bg-white w-full text-left">
                        <h2 className="text-lg md:text-2xl font-semibold">{post.title}</h2>
                        <p className="text-sm md:text-lg text-gray-600 my-4">{post.description}</p>
                        <Link href={post.slug} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
                          Read More
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Carousel Navigation */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
                <button
                  className="bg-blue-600 text-white p-2 rounded-full"
                  onClick={prevSlide}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  className="bg-blue-600 text-white p-2 rounded-full"
                  onClick={nextSlide}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
