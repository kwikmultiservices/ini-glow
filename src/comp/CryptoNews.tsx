// components/Reviews.tsx
import React from 'react';

type ReviewCardProps = {
  name: string;
  occupation: string;
  rating: number;
  reviewText: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ name, occupation, rating, reviewText }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-sm">
      <div className="flex items-center mb-4">
        <div className="text-yellow-500 text-lg">
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{reviewText}</p>
      <div className="border-t border-gray-300 pt-4">
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500 text-sm">{occupation}</p>
      </div>
    </div>
  );
};

const Reviews: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-[#f4a980] items-center p-8 space-y-6 lg:space-y-0 lg:space-x-6 rounded-lg shadow-lg">
    {/* Text Section */}
    <div className="p-6 rounded-lg  space-y-4 lg:w-2/3">
      <p className="text-white text-sm lg:text-base leading-relaxed">
        I recently started using Inglow products, and I'm incredibly impressed with the results!
        My skin feels smoother, softer, and more hydrated. I've actually noticed a visible
        difference in just 2 weeks of using the products.
        <br /><br />
        I tried the cleanser, moisturizer, and serum, and it really exceeded my expectations.
        I also appreciate how the products are non-greasy, smell amazing, refreshing, and really
        gentle on my sensitive skin.
        <br /><br />
        Overall, Inglow has become an essential part of my skincare routine, and I can’t
        recommend it enough to anyone looking to treat skin issues or interested in achieving
        a healthier and glowing skin.
      </p>
      <div className="flex items-center space-x-4">
        <img
          src="/image/i3.jpeg"
          alt="Elena Tomford"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-white font-semibold">Elena Tomford</p>
          <p className="text-white text-sm">Customer</p>
        </div>
        <span className="text-white text-2xl">“</span>
      </div>
    </div>

    {/* Image Section */}
    <div className="flex-1">
      <img
        src="/image/i4.jpeg"
        alt="Model"
        className="w-full h-full  object-cover rounded-lg"
      />
    </div>
  </div>
  );
};

export default Reviews;
