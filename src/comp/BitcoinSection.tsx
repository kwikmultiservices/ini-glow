import React from 'react';

const BitcoinStart: React.FC = () => {
  return (
    <section className="flex justify-between flex-wrap items-start p-8 bg-white">
      {/* Left Section */}
      <div className="md:w-1/3 pb-7">
        <h2 className="text-2xl font-bold mb-4">Get Started with <span className="text-black">bitcoin</span></h2>
        <h3 className="text-lg font-semibold mb-2">What is Bitcoin</h3>
        <p className="text-gray-600 mb-6">
          Bitcoin is an innovative payment network and a new kind of money. Bitcoin is one of the most important inventions in all of human history. For the first time ever, anyone can send or receive any amount of money with anyone else, anywhere on the planet, conveniently and without restriction. It’s the dawn of a better, more free world.
        </p>
        <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition">
          Get Started
        </button>
      </div>

      {/* Middle Section */}
      <div className="md:w-1/4 pb-7">
        <div className="flex  mb-4">
          <div className="bg-gray-900 p-2 rounded-full">
            {/* Placeholder for icon */}
            <span role="img" aria-label="bitcoin-icon" className="text-2xl">💰</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">Create your Bitcoin wallet</h3>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
        </p>
        <button className="text-yellow-500 font-bold flex items-center justify-center">
          Learn More <span className="ml-2">▼</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/4 pb-7">
        <div className="flex mb-4">
          <div className="bg-gray-900 p-2 rounded-full">
            {/* Placeholder for wallet icon */}
            <span role="img" aria-label="wallet-icon" className="text-2xl">👛</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">How to Get Bitcoin Wallet</h3>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
        </p>
        <button className="text-yellow-500 font-bold flex items-center justify-center">
          Get Now <span className="ml-2">▼</span>
        </button>
      </div>
    </section>
  );
};

export default BitcoinStart;
