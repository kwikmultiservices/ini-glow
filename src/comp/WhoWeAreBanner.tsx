// AboutSection.tsx
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-[#f8c3a1] p-10">
      {/* Text Section */}
      <div className="md:w-1/2 text-white space-y-4">
        <h2 className="text-3xl font-bold leading-tight">
          Who We Are! What We Are, What We Do?
        </h2>
        <p>
          At InGlow, we are a passionate skincare brand dedicated to promoting radiant, healthy skin. Our mission is to empower individuals to feel confident in their own skin by offering premium, natural and science-backed skincare solutions.
        </p>
        <p>
          We are a blend of nature and innovation, focused on creating products that nourish, protect, and enhance your skin’s natural glow. Our commitment to using clean, ethically sourced ingredients reflects our belief in holistic beauty.
        </p>
        <p>
          At InGlow, we develop high-quality skincare products tailored to meet the diverse needs of all skin types. From hydrating serums to gentle cleansers, every product is crafted to deliver visible results, leaving your skin glowing from within.
        </p>
        <ul className="space-y-2">
          <li>• Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>• Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        </ul>
        <button className="bg-white text-[#f8c3a1] font-semibold px-6 py-2 mt-4 border border-white rounded-full hover:bg-opacity-90">
          View More
        </button>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
        <div className="relative w-full h-full max-w-md md:max-w-none md:h-auto">
          <img
            src="/image/i2.png" // Replace with actual image path
            alt="InGlow Models"
            className="object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 right-4 text-white font-bold text-4xl">IG</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
