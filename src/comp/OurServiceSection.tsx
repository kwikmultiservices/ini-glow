import React from 'react';
import { CiCircleInfo } from "react-icons/ci";

const OurStorySection: React.FC = () => {
  return (
    <div className="flex flex-col items-center lg:flex-row bg-[#f0e4dd] lg:p-8 s:space-y-6 lg:space-y-0 lg:space-x-6">
    {/* Image Section */}
    <div className="flex flex-col justify-between items-center gap-2 lg:flex-row w-full lg:w-1/2">
      <img
        src="/image/i2.jpeg"
        alt="Serum"
        className=" lg:w-1/3 object-cover rounded  lg:h-[100vh]"
      />
      <img
        src="/image/i1.jpeg"
        alt="Applying Makeup"
        className=" lg:w-2/3 object-cover rounded h-full"
      />
    </div>

    {/* Info Section */}
    <div className="bg-white p-6 rounded-lg shadow-lg flex-1 w-full lg:w-1/2">
      <h2 className="text-orange-600 font-semibold text-lg">WHO WE ARE</h2>
      <p className="text-gray-700 text-sm mt-4">
        At Inglow, we believe in creating skincare solutions that are not only simple but effective. 
        We believe in creating products that not only enhance your natural beauty but also nourish 
        your skin from within. Our passion for healthier and glowing skin is reflected in our brand 
        innovations at using only scientifically approved and natural ingredients to tackle all types 
        of skin issues: acne, dryness, or aging. Our products are designed to meet your unique skin 
        needs. Join us for a glowing, healthier, and more radiant skin. Discover how our natural and 
        effective products can bring out your best glow and keep you rejuvenated all day.
      </p>
      <button className="mt-6 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
        Learn More
      </button>

      <div className="flex space-x-8 items-center justify-center text-center pt-4 lg:pt-0">
      <div>
        <p className="text-gray-900 text-2xl font-bold">90+</p>
        <p className="text-gray-600">Customer</p>
      </div>
    </div>
    </div>

    {/* Customer Count Section */}
  
  </div>
  );
};

export default OurStorySection;
