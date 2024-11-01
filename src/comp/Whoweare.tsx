import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white  px-5 md:px-20 flex flex-col md:flex-row items-center">
      {/* Left Section with Image */}
      <div className="relative w-full md:w-1/2 md:h-auto ">
        <img
          src="/image/a3.png"
          alt="Person holding books"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white text-black p-5 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Exclusive Sale On new Ebooks</h3>
            <p>Get 60% off our new Ebooks</p>
            <p>Subscribe to our newsletter to get all the update</p>
          </div>
        </div>
      </div>

      {/* Right Section with Text */}
      <div className="mt-10 md:mt-0 md:ml-10 w-full md:w-1/2 pb-7">
        <h2 className="text-3xl font-bold mb-5">Who We Are</h2>
        <p className="mb-3">
          We are a team of cybersecurity experts fighting to curb the activities of cyber criminals and scam artists which have flooded the internet in recent times.
        </p>
        <p className="mb-3">
          Our team has worked with Law Enforcement Agencies over the years to curb the activities of scam artists from various domains.
        </p>
        <p className="mb-3">
          Since other means of prohibition has failed and the scammers keep coming up with new schemes to steal the hard earned money of honest working individuals.
        </p>
        <p className="mb-3">
          Our expertise spans over two decades of research and investigation reports from law enforcement agents all over the world.
        </p>
        <p className="mb-3">
          We strongly believe that one of the most effective ways to sanitize the cyber space is via rapid sensitization of the general public who are becoming reliant on the internet for most of their daily activities.
        </p>
        <button className="bg-teal-500 text-white py-2 px-5 rounded-lg shadow-lg mt-5 mt-4">
          Start Here
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
