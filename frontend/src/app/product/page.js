"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import judo from "@/img/judo.jpg";
import axios from "axios";

const ProductPage = () => {
  const router = useRouter();
  const [quality, setQuality] = useState(1);
  // let { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [currentImage, setCurrentImage] = useState(judo);
  const [activeIndex, setActiveIndex] = useState(0); // Track active image index
  const imageContainerRef = useRef(null); // Ref for the image container

  const images = [judo, judo, judo]; // List of images

  const handleQualityIncrease = () => setQuality(quality + 1);
  const handleQualityDecrease = () => quality > 1 && setQuality(quality - 1);

  const handleCardPage = () => router.push("/cart");

  const handleImageChange = (newImage, index) => {
    setCurrentImage(newImage);
    setActiveIndex(index);

    // Scroll the slider to the active thumbnail
    if (imageContainerRef.current) {
      const container = imageContainerRef.current;
      const thumbnailWidth = 150; // Width of the thumbnail (adjust if necessary)
      container.scrollTo({
        left: index * thumbnailWidth,
        behavior: "smooth",
      });
    }
  };

  // const getAllProducts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `https://api.mrandmrsperfecttrips.in/api/v1/products/productsFinal/${id}`,
  //       { withCredentials: true }
  //     );
  //     console.log("product 8", data.msg);
  //     // setProduct(data.msg);
  //     // setCurrentImage(data)
  //   } catch (error) {
  //     console.log("error", error.message);
  //   }
  // };
  // useEffect(() => {
  //   getAllProducts();
  // }, []);
  return (
    <div className="container-fluid mt-32">
      <div className="container mx-auto px-4 py-4 min-h-screen flex flex-col md:flex-row bg-white">
        {/* Product Image Carousel */}
        <div className="w-full md:w-1/2 h-full flex flex-col py-2 px-2 items-center justify-center bg-white">
          <div className="w-full h-96 overflow-hidden relative group">
            <Image
              src={currentImage}
              alt="product image"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              style={{ objectFit: "cover" }}
              width={1920}
              height={1080}
            />
          </div>

          {/* Bottom Images List */}
          <div
            ref={imageContainerRef}
            className="flex justify-center mt-4 w-full space-x-4 overflow-x-auto py-2"
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(image, index)}
                className={`flex-shrink-0 border-2 rounded-md ${
                  activeIndex === index
                    ? "border-blue-800"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`Product thumbnail ${index + 1}`}
                  className="w-24 h-24 object-contain rounded-md hover:border-blue-800"
                  width={150}
                  height={150}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 overflow-y-auto">
          <div className="bg-gray-50 p-6">
            {/* Product Title and Price */}
            <h1 className="text-3xl font-bold">Safety Shoe</h1>
            <div className="flex items-center mt-2 mb-4">
              <span className="text-white line-through mr-2 text-lg">
                ₹60.00
              </span>
              <span className="text-blue-800 font-bold text-2xl">₹48.00</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              This safety shoe is designed for heavy-duty use, offering superior
              protection, comfort, and durability for all types of work
              environments.
            </p>

            {/* Size Selection */}
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Size:</h2>
              <div className="flex space-x-3">
                {["m", "l", "xl"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-1 border rounded-md text-sm font-medium hover:bg-gray-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center mt-6 space-x-3">
              <button
                onClick={handleCardPage}
                className="flex-1 bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>

              {/* Quantity Adjustment */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleQualityDecrease}
                  className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100"
                >
                  -
                </button>
                <span>{quality}</span>
                <button
                  onClick={handleQualityIncrease}
                  className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6">
            <div className="flex space-x-4 border-b mb-4">
              <button
                className={`pb-2 text-lg font-medium ${
                  activeTab === "details"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Additional Details
              </button>
              <button
                className={`pb-2 text-lg font-medium ${
                  activeTab === "reviews"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Additional Details</h2>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                  <li>Material: High-quality rubber sole</li>
                  <li>Protection: Steel toe cap and slip-resistant sole</li>
                  <li>Care Instructions: Wipe clean with a damp cloth</li>
                  <li>Available in multiple colors and sizes</li>
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Product Reviews</h2>
                <p className="text-gray-600 text-sm">
                  "These shoes are extremely comfortable and durable for a long
                  day of work."
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  "The steel toe cap is a game changer for safety on the job
                  site."
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
