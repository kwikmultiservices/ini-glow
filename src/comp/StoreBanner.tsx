import React, { useEffect, useState } from 'react';
import { getApplication } from '../Services/GetUser.service';
import { Applicationdata } from '../Services/interface';

const StoreBanner: React.FC = () => {
  const [Application, setapplication] = useState<Applicationdata>()
  useEffect(() => {
     getApplication(null, (postData: any) => {
      setapplication(postData)
   
    });
  }, [])

  return (
    <section
    className="flex items-center justify-between flex-col md:flex-row px-3 md:px-8 py-12 md:h-[60vh] bg-cover bg-center bg-[#D6CDC680]"
    style={{
      backgroundImage: "url('/image/i9.jpeg')",
    }}
  >
    <div className="text-section md:w-1/2">
      <p className="mt-4 text-lg text-gray-600 italic">Glow from Within</p>
      <button className="mt-6 px-6 py-3 border border-primary text-black font-semibold rounded-lg hover:bg-opacity-90">
        Search Categories
      </button>
    </div>
  </section>
  
  );
};

export default StoreBanner;
