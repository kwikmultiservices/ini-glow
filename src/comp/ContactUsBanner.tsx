import React from 'react';

const WhoWeAreBanner: React.FC = () => {
  return (
    <div
      className="relative bg-primary h-[50vh] w-full flex justify-center items-center p-5 flex-col"
    >
      {/* Top-left text */}
      <div className="">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
         Contact Us
        </h1>
      </div>

      {/* Bottom-right text */}
      <h1 className=" text-[1.1rem] font-bold text-white">
          Home / <span className='text-white-500'>Contact</span>
        </h1>
    </div>
  );
};

export default WhoWeAreBanner;
