import React from 'react';
import Image from 'next/image';
import blogImage1 from '@/img/karate.jpg';
import blogImage2 from '@/img/judo.jpg';
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
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra massa vel elit condimentum gravida. 
    Curabitur sollicitudin ligula et justo auctor, non elementum elit gravida. Integer posuere diam ut quam facilisis, id 
    consectetur tortor varius. Nulla facilisi. In hac habitasse platea dictumst. Phasellus et metus gravida, feugiat eros nec, 
    auctor ante. Sed maximus elit vel gravida pharetra. Nam ultricies volutpat tortor vel fermentum. Fusce hendrerit nisl vel 
    nisi consequat, sed cursus felis tempor. Nulla tristique orci ligula, vel egestas nisi fermentum vel. Donec fringilla vel felis 
    et pharetra. Donec vel orci vitae velit congue hendrerit ut eu lectus.`,
    date: 'January 1, 2024',
    slug: '/blog/1',
  },
  {
    id: 2,
    title: 'Blog Title 2',
    description: 'Description for blog 2 goes here.',
    image: blogImage2,
    content: `Aliquam malesuada neque ut fermentum interdum. Morbi a gravida magna, ac hendrerit risus. Curabitur cursus odio sit 
    amet sollicitudin gravida. Pellentesque auctor, purus ac pretium tristique, ipsum risus gravida tortor, id egestas ante nunc a 
    mauris. Etiam feugiat nulla non feugiat pretium. Morbi vehicula augue et magna fermentum, eu scelerisque neque vulputate.`,
    date: 'January 2, 2024',
    slug: '/blog/2',
  },
  {
    id: 3,
    title: 'Blog Title 3',
    description: 'Blog description goes here. Stay updated with the latest news and articles.',
    image: blogImage1,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra massa vel elit condimentum gravida. 
    Curabitur sollicitudin ligula et justo auctor, non elementum elit gravida. Integer posuere diam ut quam facilisis, id 
    consectetur tortor varius. Nulla facilisi. In hac habitasse platea dictumst. Phasellus et metus gravida, feugiat eros nec, 
    auctor ante. Sed maximus elit vel gravida pharetra. Nam ultricies volutpat tortor vel fermentum. Fusce hendrerit nisl vel 
    nisi consequat, sed cursus felis tempor. Nulla tristique orci ligula, vel egestas nisi fermentum vel. Donec fringilla vel felis 
    et pharetra. Donec vel orci vitae velit congue hendrerit ut eu lectus.`,
    date: 'January 1, 2024',
    slug: '/blog/1',
  },
  {
    id: 4,
    title: 'Blog Title 4',
    description: 'Blog description goes here. Stay updated with the latest news and articles.',
    image: blogImage1,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra massa vel elit condimentum gravida. 
    Curabitur sollicitudin ligula et justo auctor, non elementum elit gravida. Integer posuere diam ut quam facilisis, id 
    consectetur tortor varius. Nulla facilisi. In hac habitasse platea dictumst. Phasellus et metus gravida, feugiat eros nec, 
    auctor ante. Sed maximus elit vel gravida pharetra. Nam ultricies volutpat tortor vel fermentum. Fusce hendrerit nisl vel 
    nisi consequat, sed cursus felis tempor. Nulla tristique orci ligula, vel egestas nisi fermentum vel. Donec fringilla vel felis 
    et pharetra. Donec vel orci vitae velit congue hendrerit ut eu lectus.`,
    date: 'January 1, 2024',
    slug: '/blog/1',
  },
  // Add more blog posts here
];

const Blog = () => {
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

      <div className="container mx-auto px-4 sm:px-6 py-8 mt-24">
        {/* Blog Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-dark-blue">Our Blog</h1>
            <p className="text-lg sm:text-xl text-gray-600">Stay updated with the latest news and articles</p>
          </div>
        </div>

        {/* Featured Post */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Post Title and Content */}
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">{blogPosts[0].title}</h2>
                <p className="text-lg text-gray-600">{blogPosts[0].date}</p>
                <p className="text-lg text-gray-600">{blogPosts[0].description}</p>
              </div>

              {/* Featured Image */}
              <div className="w-full mb-8">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-[400px] object-cover rounded-lg"
                  width={1200}
                  height={400}
                />
              </div>

              {/* Article Content */}
              <div className="space-y-8">
                <p className="text-lg text-gray-600 leading-relaxed">{blogPosts[0].content}</p>
              </div>

              {/* Social Media Share Links */}
              <div className="flex space-x-4 mt-6">
                <a href="https://www.facebook.com" target="_blank" className="text-blue-600">
                  <FaFacebook className="h-5 w-5" />
                </a>
                <a href="https://www.twitter.com" target="_blank" className="text-blue-400">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com" target="_blank" className="text-pink-600">
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" className="text-blue-700">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Recent Posts */}
          <div className="lg:col-span-1 space-y-8">
            <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col items-center shadow-md rounded-sm bg-white p-4 w-full mb-6">
                <div className="w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[200px] sm:h-[200px] object-cover rounded-sm"
                    width={300}
                    height={250}
                  />
                </div>
                <h4 className="text-lg font-semibold">{post.title}</h4>
                <p className="text-sm text-gray-600">{post.description}</p>
                <Link href={post.slug}>
                  <span className="text-blue-600 mt-4 inline-block cursor-pointer">Read More</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Additional Recent Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Latest Blog Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col p-4 shadow-lg rounded-lg bg-white">
                <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
                <p className="text-lg text-gray-600">{post.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link href={post.slug}>
                    <span className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer">Read More</span>
                  </Link>
                  <div className="flex space-x-2">
                    <a href="https://www.facebook.com" target="_blank" className="text-blue-600">
                      <FaFacebook className="h-5 w-5" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" className="text-blue-400">
                      <FaTwitter className="h-5 w-5" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" className="text-pink-600">
                      <FaInstagram className="h-5 w-5" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" className="text-blue-700">
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
