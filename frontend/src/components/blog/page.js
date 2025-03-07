import React from 'react'
import Image from 'next/image'
import blogImage1 from '../../img/karate.jpg'
import blogImage2 from '../../img/judo.jpg'
import { ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon, CalendarIcon } from '@heroicons/react/24/outline'

const Blog = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Blog Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-dark-blue">Our Blog</h2>
          <p className="text-lg sm:text-xl text-gray-600">Stay updated with the latest news and articles</p>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <button className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors flex items-center">
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Prev
          </button>
          <button className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors flex items-center">
            Next
            <ChevronRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Blog Post List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Blog Post 1 */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 shadow-md rounded-sm p-2">
          <div className="sm:w-1/2 w-full rounded-lg overflow-hidden">
            <Image 
              src={blogImage1}
              alt="Blog 1"
              className="w-full h-[250px] sm:h-[450px] object-cover rounded-sm"
              width={300}
              height={450}
            />
          </div>
          <div className="sm:w-1/2 w-full p-4 bg-white">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 hover:text-blue-800">Blog Title 1</h3>
            <p className="text-base sm:text-lg text-gray-600 flex items-center">
              <InformationCircleIcon className="h-5 w-5 mr-2" />
              Blog description goes here. Stay updated with the latest news and articles.
            </p>
            <p className="text-base sm:text-lg text-gray-600 flex items-center mt-2">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Published on: January 1, 2024
            </p>
            <button className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mt-4 flex items-center justify-between">
              Read More
              <ChevronRightIcon className="ml-2" width={20} />
            </button>
          </div>
        </div>

        {/* Blog Post 2 */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 shadow-md rounded-sm p-2">
          <div className="sm:w-1/2 w-full rounded-lg overflow-hidden">
            <Image 
              src={blogImage2}
              alt="Blog 2"
              className="w-full h-[250px] sm:h-[450px] object-cover rounded-sm"
              width={300}
              height={450}
            />
          </div>
          <div className="sm:w-1/2 w-full p-4 bg-white">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 hover:text-blue-800">Blog Title 2</h3>
            <p className="text-base sm:text-lg text-gray-600 flex items-center">
              <InformationCircleIcon className="h-5 w-5 mr-2" />
              Blog description goes here. Stay updated with the latest news and articles.
            </p>
            <p className="text-base sm:text-lg text-gray-600 flex items-center mt-2">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Published on: January 2, 2024
            </p>
            <button className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mt-4 flex items-center justify-between">
              Read More
              <ChevronRightIcon className="ml-2" width={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
