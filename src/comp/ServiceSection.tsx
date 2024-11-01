import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getPosts } from '../Services/GetUser.service';
import { Product } from '../Services/interface';
import { useCart } from '../Services/CartContext';
import { useNavigate } from 'react-router-dom';

const ImageCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Use an empty array as default
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = 4; // Number of images visible at a time
  const auth = getAuth(); // Firebase Auth
  const navigate = useNavigate()
  const { addToCart, cartItems } = useCart(); // Using CartContext for cart actions

  const shuffleArray = (array: Product[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch products and shuffle them before setting state
  useEffect(() => {
    getPosts(null, (items: Product[]) => {
      const shuffledItems = shuffleArray(items); // Shuffle the items
      setProducts(shuffledItems); // Set the shuffled products
    });
  }, []);

  // Function to handle right arrow click (next set of images)
  const handleNext = () => {
    if (products && currentIndex + visibleImages < products.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to handle left arrow click (previous set of images)
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to add item to cart (using CartContext)
  const handleAddToCart = (item: Product) => {
  
    addToCart(item);
  };

  return (
    <div className="mx-auto p-8 text-center">
      {/* Title and rating */}
      <div className="mb-4">
        <div className="flex justify-center items-center">
          {/* Render stars */}
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-yellow-500 text-xl">
              &#9733;
            </span>
          ))}
        </div>
        <p className="text-gray-700 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
        </p>
      </div>

      {/* Image carousel with arrows */}
      <div className="relative">
        {/* Left arrow */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
          >
            &#8249; {/* Left arrow symbol */}
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {products.slice(currentIndex, currentIndex + visibleImages).map((product, index) => (
            <div key={index} className="relative">
              <img
                src={product.productThumbnail} // Assuming each product has a 'productThumbnail' property for the image
                alt={product.productName} // Use alt if available, fallback to product name
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-[#95725A] text-white py-2 px-4 rounded-md"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        {products && currentIndex + visibleImages < products.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
          >
            &#8250; {/* Right arrow symbol */}
          </button>
        )}
      </div>

      <div className="mt-4 flex justify-center text-center items-center">
        <button onClick={()=>navigate("/store")} className='rounded-md text-white bg-[#5b3111] p-2 border-black'>View All</button>
      </div>
    </div>
  );
};

export default ImageCarousel;
