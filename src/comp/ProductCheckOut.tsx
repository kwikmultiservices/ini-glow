import React, { useState } from "react";

import { convertHtmlToText } from "../Services/Utility";

import { useNavigate } from "react-router-dom";
import { Product } from "../Services/interface";

interface ProductPageProps {
  product: Product;
}

const ProductCheckout: React.FC<ProductPageProps> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate()
  const plainTextDescription = convertHtmlToText(product.productDescription);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    if (selectedImageIndex < product.productImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleContact = ()=>{
   navigate(-1)
  }
  return (
    <div className="flex flex-col w-full md:flex-row p-4 md:p-[2rem]">
      {/* Product Image */}
     <div className="">
     <div className="  mb-3 relative">
        <img
          src={product.productImages[selectedImageIndex]}
          alt="Product"
          className="w-full h-[60vh] rounded-lg"
        />
        {/* Slider Controls */}
        <button
          onClick={handlePreviousImage}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow ${
            selectedImageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedImageIndex === 0}
        >
          ←
        </button>
        <button
          onClick={handleNextImage}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow ${
            selectedImageIndex === product.productImages.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={selectedImageIndex === product.productImages.length - 1}
        >
          →
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.productImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product ${index}`}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
              selectedImageIndex === index ? "border-blue-500" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
     </div>

      {/* Product Information */}
      <div className="p-2 rounded-lg md:w-[50%]">
        <div className="underline text-[1.4rem] pb-4">Product Information</div>
        <h1 className="text-gray-600 pb-4">Product Name: {product.productName}</h1>
        {/* <p className="text-gray-600 pb-4">Category: {product.productCategory}</p> */}
        <p className="text-xl font-semibold pb-4">Price: ${product.salesPrice ? product.salesPrice : 0}</p>
        <p className="overflow-auto pb-4">{plainTextDescription}</p>

    
        {/* <p
          className={`text-${
            product.isOutOfStock ? "red-500" : "green-600"
          } font-semibold pb-4`}
        >
          Status: {product.isOutOfStock ? "Out of Stock" : "In Stock"}
        </p>

        <p>Product Code: {product.productCode}</p>
        <p>Quantity Available: {product.quantity}</p>

        {/* Buy Now Button */}
        <button
          onClick={handleContact}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          View Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCheckout;
