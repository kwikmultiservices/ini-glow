import React from "react";

const BitcoinSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white py-10 px-5 md:px-20">
      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">
          Why buy and sell Bitcoin with us?
        </h2>
        <p className="text-gray-600 mb-6">
          Morbi ut dapibus dui. Sed ut iaculis elit, quis varius mauris. Integer
          ut ultricies orci, lobortis egestas sem. Morbi ut dapibus dui. Sed ut
          iaculis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Curabitur ultricies pellentesque mauris a elementum. Cras eu ornare
          turpis. Morbi id maximus lorem. Duis leo sapien, accumsan ves tibulum
          massa sit amet, sollicitudin euismod libero. Aliquam mollis ipsum eget
          nulla pulvinar, a fringilla urna consectetur.
        </p>
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition">
          Learn More
        </button>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex gap-4">
        <img
          src="/image/f11.png"
          alt="Placeholder 1"
          className="w-1/2 h-auto rounded-md"
        />
        <img
          src="/image/f12.png"
          alt="Placeholder 2"
          className="w-1/2 h-auto rounded-md"
        />
      </div>
    </div>
  );
};

export default BitcoinSection;
