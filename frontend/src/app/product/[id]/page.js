"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import judo from "@/img/judo.jpg";
import karate from "@/img/karate.jpg";
import { CartContext } from "@/context/CartContext";
import FeatureCategory from "@/components/featureCategory/page";
import axios from "axios";
import { toast } from "sonner";

const ProductDetail = () => {
  const router = useRouter();
  // Destructure cart and addItemToCart from CartContext
  const { addItemToCart } = useContext(CartContext);
  const { id } = useParams(); // Extract the product ID from the route parameters

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [product, setProduct] = useState(null); // Product details state
  const [currentImage, setCurrentImage] = useState(null); // Current main image
  const [activeIndex, setActiveIndex] = useState(0); // Active image index
  const [quantity, setQuantity] = useState(1); // Product quantity
  const imageContainerRef = useRef(null); // Ref for image thumbnails

  // Simulated API call to fetch product details based on `id`
  // useEffect(() => {
  //   if (id) {
  //     const fetchedProduct = {
  //       id,
  //       name: "Safety Shoe",
  //       price: 480.0,
  //       description:
  //         "A durable and comfortable safety shoe designed for tough environments. Made with high-quality material, it ensures safety and style.",
  //       images: [judo, karate, judo], // Replace with real URLs
  //       details: [
  //         "Material: High-quality rubber sole",
  //         "Protection: Steel toe cap and slip-resistant sole",
  //         "Care Instructions: Wipe clean with a damp cloth",
  //         "Available in multiple colors and sizes",
  //       ],
  //       stock: 10, // Overall product stock (if needed)
  //       variants: [
  //         { size: "Small", price: 450, stock: 5 },
  //         { size: "Medium", price: 480, stock: 10 },
  //         { size: "Large", price: 500, stock: 8 },
  //       ],
  //     };
  //     setProduct(fetchedProduct);
  //     setCurrentImage(fetchedProduct.images[0]); // Set the first image as the default
  //     setSelectedVariant(fetchedProduct.variants[0]);
  //   }
  // }, [id]);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://api.mrandmrsperfecttrips.in/api/v1/products/productsFinal/${id}`,
        { withCredentials: true }
      );
      setProduct(data.msg);
      setSelectedVariant(data.msg?.variant[0]);
      setCurrentImage(data.msg?.images[0]);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);

  // Loading state
  if (!product) {
    return <p className="text-center mt-24">Loading...</p>;
  }

  // Handle image change
  const handleImageChange = (newImage, index) => {
    setCurrentImage(newImage);
    setActiveIndex(index);

    // Scroll to the selected thumbnail
    if (imageContainerRef.current) {
      const thumbnailWidth = 150; // Width of the thumbnail
      imageContainerRef.current.scrollTo({
        left: index * thumbnailWidth,
        behavior: "smooth",
      });
    }
  };

  // Add to cart handler
  const addToCartHandler = () => {
    if (quantity > selectedVariant?.stock) {
      return toast.error("Not enough stock available!");
    }
    try {
      addItemToCart({
        product: product._id,
        name: product.name,
        price: selectedVariant.finalPrice,
        image: product.images[0], // Use the first image in the array
        stock: selectedVariant.stock,
        quantity,
        variant: selectedVariant.size,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Product is out of stock.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }

    router.push("/cart");
  };

  return (
    <div className="container mt-24 mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full h-96 overflow-hidden relative">
            <Image
              //currentImage
              src={currentImage}
              alt="Product image"
              className="h-full object-cover"
              width={1920}
              height={1080}
            />
          </div>

          {/* Thumbnails */}
          <div
            ref={imageContainerRef}
            className="flex justify-center mt-4 w-full space-x-4 overflow-x-auto py-2"
          >
            {product?.images?.map((image, index) => (
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
                  className="w-24 h-24 object-cover rounded-md"
                  width={150}
                  height={150}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-6 bg-gray-50">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-blue-800 font-semibold mb-4">
            ₹
            {selectedVariant
              ? selectedVariant.finalPrice.toFixed(2)
              : product.price.toFixed(2)}
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="text-gray-600 mb-6"
          />
          <div className="mb-4 flex">
            <label className="font-semibold mr-2">Stock</label>
            <p>{selectedVariant?.stock}</p>
          </div>
          <div className="mb-4">
            <label className="font-semibold">Choose Size: </label>
            <select
              className="border p-2 rounded-md"
              onChange={(e) => {
                const variant = product.variant.find(
                  (v) => v.size === e.target.value
                );
                setSelectedVariant(variant);
                setQuantity(1); // Reset quantity on variant change
              }}
              value={selectedVariant?.size}
            >
              {product?.variant.map((variant, index) => (
                <option key={index} value={variant.size}>
                  {variant.size} - ₹{variant.finalPrice}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={addToCartHandler}
              className="bg-blue-800 text-white py-2 px-6 rounded-md hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>

          {/* Additional Details Section */}
          <div>
            <h2 className="text-lg font-medium mb-2">Additional Details</h2>
            <ul className="list-disc pl-5 text-gray-600">
              {/* li for additional description */}
              <p
                dangerouslySetInnerHTML={{
                  __html: product?.Additionaldescription,
                }}
              />
            </ul>
          </div>
        </div>
      </div>
      <FeatureCategory
        products={product?.mainCategory}
        id={product?.mainCategory?._id}
      />
    </div>
  );
};

export default ProductDetail;
