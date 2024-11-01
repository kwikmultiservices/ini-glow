import React, { useState } from 'react';
import {collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from '../firebase';
import { getRandomString } from '../Services/GetRandomNumber';
interface props {
  hidImage4?:boolean
}

const ContactUs: React.FC<props> = ({hidImage4}) => {
  // State variables to capture form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phone, setphone] = useState("")
  const [businessType, setBusinessType]= useState("")

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1234")
    setLoading(true);
  
    try {
      // Generate a new document reference with Firestore's auto-generated ID
      
      const user = {
        id: getRandomString(35, '1234567890qwertyuiopasdfhjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM'),
        fullName: name,
        phone:phone, // Should this be email or phone number? Consider renaming to `mobileNumber` if needed
        message:message,
        type: "contact",
        email
      };

      const docRef = doc(collection(database, 'newsletterSubmissions'), user.id);
      await setDoc(docRef, user);
      setSuccess(true)
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error writing document: ", error);
      setSuccess(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <br />
     <br />

          {/* Right Section - Contact Form */}
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Send Us A Message
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              <div className="grid grid-cols-1  gap-4 mb-4">
            
                <input
                  type="tel"
                  placeholder="Phone "
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
             

              <div className="mb-4">
                <textarea
                  placeholder="Send a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 border border-gray-300 rounded-lg p-2"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Contact Us"}
              </button>

              {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
            </form>
          </div>
        </div>
   
    </div>
  );
};

export default ContactUs;
