import React, { useEffect, useState } from 'react';
import { getApplication } from '../Services/GetUser.service';
import { Applicationdata } from '../Services/interface';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [Application, setapplication] = useState<Applicationdata>()
  const navigate = useNavigate()
  useEffect(() => {
     getApplication(null, (postData: any) => {
      setapplication(postData)
   
    });
  }, [])

  return (
    <div className="bg-[#F5C1A2] min-h-screen flex flex-col items-center pt-16 px-4 md:px-0">
    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-semibold text-white">INGLOW SKINCARE,</h1>
      <p className="text-lg text-white mt-2">Organic Skincare Line</p>
      <button onClick={()=>navigate(`store`)} className="mt-4 px-6 py-2 border border-white text-white hover:bg-white hover:text-[#F5C1A2] transition">
        Explore
      </button>
    </div>

    {/* Image Section */}
    <div className="flex justify-center flex-col lg:flex-row items-center gap-6">
      {/* Left Image */}
      <div className="relative">
        <img
          src={Application?.landingPageImage2} // replace with actual image URL
          alt="Left Image"
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-4 left-4 text-white font-bold text-xl">IG</span>
      </div>

      {/* Divider */}
      <div className="w-[20%] h-96 bg-[#FAF2E3] hidden md:block"></div>

      {/* Right Image */}
      <div className="relative">
        <img
          src={Application?.landingPageImage} // replace with actual image URL
          alt="Right Image"
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-4 left-4 text-white font-bold text-xl">IG</span>
      </div>
    </div>
  </div>
  );
};
 
export default Hero;
