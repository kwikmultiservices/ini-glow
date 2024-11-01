// components/Footer.tsx
import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { FaArrowRight } from "react-icons/fa";
import { Applicationdata } from "../Services/interface";
import { getApplication } from "../Services/GetUser.service";
import { getRandomString } from "../Services/Utility";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    modalNumber: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [Application, setapplication] = useState<Applicationdata>()
  useEffect(() => {
     getApplication(null, (postData: any) => {
      setapplication(postData)
   
    });
  }, [])
 
  // Handle newsletter email submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
    } else {
      setIsModalOpen(true);
    }
  };

  // Handle form submit and save data to Firebase Firestore
  const handleFormSubmit = async (e?:any) => {
    e.preventDefault()
    try {
      const id = getRandomString(34,"1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM")
      await setDoc(doc(database, "newsletterSubmissions", id), {
        fullName: formData.fullName || "",
        phone: formData.modalNumber || "", // Should this be email or phone number? Consider renaming to `mobileNumber` if needed
        message: formData.message || "",
        type: "newsletter",
        email
      });
      setError("");
      setIsModalOpen(false);
      alert("Data saved successfully!");
    } catch (error) {
      setError("Failed to save data.");
    }
  };

  const handleClose = ()=>{
    handleFormSubmit()
    setIsModalOpen(false)
  }

  return (
   <div className="">
          <div className=" mx-auto mt-10 flex justify-between items-center flex-wrap gap-4 px-2">
        <div>
          <h4 className="font-bold text-lg">Our Newsletter.</h4>
          <p>Get instant news by subscribing to our daily newsletter</p>
        </div>
        <form className="flex items-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-4 py-2 border rounded-lg w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="p-2 border border-black rounded-xl cursor-pointer" onClick={handleNewsletterSubmit}><FaArrowRight /></div>
        </form>
      </div>
     <div className={`bg-[${Application?.footerBackground}] py-10 px-4`}>
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 content-center  gap-8 text-gray-600">
        <div>
          <h3 className="font-bold">Address:</h3>
          <p>contact@babblyng.co</p>
          <p>{Application?.contactEmail}</p>
          <p>{Application?.phoneNumber}</p>
          {/* <p>UK: +44 7879879610</p> */}
        </div>
        <div>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>LinkedIn</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
            <li>FAQ</li>
            <li>Support</li>
          </ul>
        </div>
      </div>


    
   
      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Complete your Subscription</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="tell"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.modalNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, modalNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Save
              </button>
            </form>
            <button
              onClick={()=>handleClose()}
              className="mt-4 text-red-500 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      
    </div>

<div className="bg-[#95725A] text-black text-center p-4">
@2024 Ini-glow.. All rights Reserved.
</div>
   </div>
  );
};

export default Footer;
