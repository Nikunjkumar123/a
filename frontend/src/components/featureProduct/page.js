import React from 'react'
import { UserGroupIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

const FeatureProduct = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-dark-blue">Professional sports products</h2>
        <p className="text-lg sm:text-xl text-gray-600">We specialize in a variety of professional sports products.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center bg-blue-800 p-6 sm:p-8 rounded-lg shadow-lg">
        {/* Left section (Text) */}
        <div className="flex flex-col sm:w-1/2 w-full space-y-4 text-white">
          <div className="flex items-start space-x-2">
            <UserGroupIcon className="h-6 w-6 text-white" />
            <div>
              <span className="text-lg sm:text-xl font-semibold">A friendly team works for you</span>
              <p className="text-sm sm:text-base">
                Our team is always ready to help you with any questions you may have.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircleIcon className="h-6 w-6 text-white" />
            <div>
              <span className="text-lg sm:text-xl font-semibold">Professional grade equipment</span>
              <p className="text-sm sm:text-base">
                We offer only the best quality products for your sports needs.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <ClockIcon className="h-6 w-6 text-white" />
            <div>
              <span className="text-lg sm:text-xl font-semibold">Time-tested product manufacturers</span>
              <p className="text-sm sm:text-base">
                Our products are made by the best manufacturers in the industry.
              </p>
            </div>
          </div>
        </div>

        {/* Right section (Video) */}
        <div className="flex flex-col sm:w-1/2 w-full mt-6 sm:mt-0 sm:ml-8">
          <iframe
            width="100%"
            height="auto"
            src="https://www.youtube.com/embed/XHOmBV4js_E"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default FeatureProduct
