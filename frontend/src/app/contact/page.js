'use client';
import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import contactImage from '@/img/contact.jpg'; // Make sure to include the image
import Link from 'next/link';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen container mx-auto px-4 mt-20 py-12">
      {/* Top Banner Section */}
      <div className="w-full bg-gradient-to-l from-blue-800 to-white text-center py-8">
        <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        <p className="text-white mt-2">
          <Link href={'/'}>Home</Link> / Contact Us
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start rounded-lg bg-white mt-8">
        {/* Left image and details section */}
        <div className="lg:w-1/2 w-full flex flex-col justify-between">
          <div className="relative w-full h-96"> {/* Adjust height for better image scaling */}
            <Image
              src={contactImage}
              alt="Contact Us"
              className="rounded-lg object-cover w-full h-full"
              layout="fill" // This will make the image cover the entire div area
            />
          </div>
          <div className="mt-6 px-4">
            <h3 className="text-2xl font-semibold text-gray-800">Our Office</h3>
            <p className="text-gray-600 mt-2">1234 Sports Avenue, Suite 100</p>
            <p className="text-gray-600">City, Country, 12345</p>
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-gray-800">Contact Information</h4>
              <p className="text-gray-600 mt-2">Phone: +123 456 7890</p>
              <p className="text-gray-600">Email: contact@aikonsports.com</p>
            </div>
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-gray-800">Follow Us</h4>
              <div className="flex space-x-4 mt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-blue-600 hover:text-blue-800 text-2xl" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-400 hover:text-blue-600 text-2xl" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-pink-500 hover:text-pink-700 text-2xl" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-700 hover:text-blue-900 text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right content and form section */}
        <div className="lg:w-1/2 w-full p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
            <p className="text-gray-600 mb-4">
              Have questions or need help? Reach out to us, and we’ll get back to you as soon as possible.
            </p>
            <p className="text-gray-600 mb-6">
              You can also follow us on social media for updates and news.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
