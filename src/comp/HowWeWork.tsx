import React from "react";

const NewToBitcoin: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row  gap-4 items-center justify-between bg-white py-10 px-5 ">
      {/* Image Section */}
      <div className="md:w-1/3">
        <img
          src="/image/f13.png"
          alt="Cryptocurrency coins"
          className="w-full h-[60vh]  rounded-md"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-2/3 bg-black min-h-[60vh] text-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">New to Bitcoin?</h2>
        <p className="text-gray-400 mb-4">
          Incubator ramen viral product management direct mailing, such founders
          gamification effect. Branding funding incubator. Release user
          experience beta. Backing monetization paradigm shift client.
        </p>
        <p className="text-gray-400 mb-8">
          Canvas metri essar. Incubator ramen viral product management direct
          mailing, such founders gamification branding funding incubator.
          Release user experience beta. Backing monetization paradigm shift
          client.
        </p>
        <div className="grid grid-cols-2 gap-4 text-yellow-500">
          <button className="hover:text-yellow-600">Learn About Bitcoin</button>
          <button className="hover:text-yellow-600">Bitcoin Wallets</button>
          <button className="hover:text-yellow-600">How to Transfer?</button>
          <button className="hover:text-yellow-600">Exchange</button>
        </div>
      </div>
    </div>
  );
};

export default NewToBitcoin;
