import React, { useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { Applicationdata } from '../Services/interface';
import { getApplication } from '../Services/GetUser.service';

const ContactInfo: React.FC = () => {

    const [Application, setapplication] = useState<Applicationdata>()
    useEffect(() => {
       getApplication(null, (postData: any) => {
        setapplication(postData)
     
      });
    }, [])
  return (
    <div className="flex flex-col md:flex-row justify-around items-center p-8 bg-white">
      {/* Contact Us */}
      <div className="flex items-center bg-primary-light rounded-lg p-6 m-4 w-full md:w-1/3">
        <div className="bg-brown-600 rounded-full p-3 text-white mr-4">
          <FaPhoneAlt size={24} />
        </div>
        <div>
          <h4 className="text-gray-700 font-semibold">CONTACT US</h4>
          <p className="text-gray-500">{Application?.phoneNumber}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center bg-primary-light rounded-lg p-6 m-4 w-full md:w-1/3">
        <div className="bg-brown-600 rounded-full p-3 text-white mr-4">
          <IoLocationSharp size={24} />
        </div>
        <div>
          <h4 className="text-gray-700 font-semibold">LOCATION</h4>
          <p className="text-gray-500">{Application?.address}</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center bg-primary-light rounded-lg p-6 m-4 w-full md:w-1/3">
        <div className="bg-brown-600 rounded-full p-3 text-white mr-4">
          <MdEmail size={24} />
        </div>
        <div>
          <h4 className="text-gray-700 font-semibold">EMAIL</h4>
          <p className="text-gray-500">{Application?.contactEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
