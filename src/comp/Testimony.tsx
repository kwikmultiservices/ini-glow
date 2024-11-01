import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getPosts } from '../Services/GetUser.service';
import { Product } from '../Services/interface';
import { formatNumber } from '../Services/Utility';
import { useCart } from '../Services/CartContext';

const ImageCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Use an empty array as default
  const { addToCart } = useCart(); // Using CartContext for cart actions


  // Fetch products from the service
  useEffect(() => {
    getPosts(null, (items: Product[]) => {
      setProducts(items);
    });
  }, []);

  const handleAddToCart = (item: Product) => {
  
    addToCart(item);
  };



  // Function to retrieve cart items

  return (
    <div className="mx-auto p-8 text-center">
      {/* Title and rating */}

      <div className="text-center pb-6">
        <p className="p-2 text-[#582b15]">Best Seller</p>
        <h1 className='font-extrabold text-[#582b15]'>Recent Product</h1>
      </div>

      {/* Image carousel with arrows */}
      <div className="relative">
      

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {products.slice(0,13).map((product, index) => (
            <div className="">
              <div key={index} className="relative ">
              <img
                src={product.productThumbnail} // Assuming each product has a 'src' property for the image
                alt={product.productName} // Use alt if available, fallback to product name
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center  bg-opacity-50  hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-[#95725A] text-white py-2 px-4 rounded-md"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
            <div className="text-center pb-6">
        <p className="p-2 text-[#582b15]">{product.productName}</p>
       <div className="flex gap-3 justify-center items-center">
       <h1 className='font-extrabold text-[#582b15] underline'>&#8358; {formatNumber(product.salesPrice)}</h1>
       <h1 className='font-extrabold text-gray-400 line-through'>&#8358; {formatNumber(product.price)}</h1>
       </div>
      </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default ImageCarousel;
