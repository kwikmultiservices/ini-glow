import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import { uploadFile } from "../Services/Upload.service";
import { toast } from "react-toastify";

interface Application {
  id?: string;
  logo?: string;
  landingPageImage?: string;
  landingPageImage2?: string;
  contactEmail?: string;
  phoneNumber?: string;
  address?: string;
  paymentLink?: string;
  footerBackground?: string;
  navbarBackground?: string;
  services?: string;
  userLogo?:string
}

const CreateApplication: React.FC = () => {
  const [applicationId, setApplicationId] = useState<string | null>("1234567890"); // Replace with actual application ID
  const [applicationData, setApplicationData] = useState<Application>({
    logo: "",
    landingPageImage: "",
    landingPageImage2:"",
    contactEmail: "",
    phoneNumber: "",
    address: "",
    paymentLink: "",
    footerBackground: "#EEE239",
    navbarBackground: "#1286GH0",
    services: "",
    userLogo:""
  });
  const [isNew, setIsNew] = useState(false); // Track if it's a new application
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [userLogo, setUserLogo]  = useState<File | null>(null)
  const [landingPageImageFile, setLandingPageImageFile] = useState<File | null>(null);
  const [landingPageImageFiles, setLandingPageImageFile2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false)
  // Fetch application from Firestore by ID
  const fetchApplicationById = async (id: string) => {
    try {
      const docRef = doc(database, "applications", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setApplicationData(docSnap.data() as Application);
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    setLoading(true)
    try {
      let logoUrl = applicationData.logo;
      let landingPageUrl = applicationData.landingPageImage;
      let landingPageUrle = applicationData.landingPageImage2;
      let userLog = applicationData.userLogo
      if (logoFile) {
        logoUrl = await uploadFile(logoFile, "product-images"); // Upload logo
      }

      if (landingPageImageFile) {
        landingPageUrl = await uploadFile(landingPageImageFile, "product-images"); // Upload landing page image
      }

      if (landingPageImageFiles) {
        landingPageUrle = await uploadFile(landingPageImageFiles, "product-images"); // Upload landing page image
      }

      if(userLogo){
        userLog = await uploadFile(userLogo, "product-images"); // Upload landing page image
      }
      
      

      const updatedData = {
        ...applicationData,
        logo: logoUrl,
        landingPageImage: landingPageUrl,
        userLog,
        landingPageImage2:landingPageUrle
      };

      if (isNew) {
        // Create new application
        const newDocRef = doc(database, "applications", applicationId!);
        await setDoc(newDocRef, updatedData);
      } else {
        // Update existing application
        const existingDocRef = doc(database, "applications", applicationId!);
        await setDoc(existingDocRef, updatedData, { merge: true });
      }

      toast.success("Application saved successfully!");
    } catch (error) {
      console.error("Error saving application:", error);
    }
    setLoading(false)
  };

  useEffect(() => {
    if (applicationId) {
      fetchApplicationById(applicationId);
    }
  }, [applicationId]);

  // Handle input change for form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setApplicationData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle file input change for logo and landing page image
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
  };

  return (
    <div className="p-8  mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Edit Logo</label>
          <input
            type="file"
            name="logo"
            onChange={(e) => handleFileChange(e, setLogoFile)}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>
        {/* Logo */}
        <div>
          <label className="block font-semibold">Landing page Image2</label>
          <input
            type="file"
            name="logo"
            onChange={(e) => handleFileChange(e, setLandingPageImageFile2)}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        <div>
          <label className="block font-semibold">User Logo</label>
          <input
            type="file"
            name="logo"
            onChange={(e) => handleFileChange(e, setUserLogo)}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        {/* Landing Page Image */}
        <div>
          <label className="block font-semibold">Landing Page Image</label>
          <input
            type="file"
            name="landingPageImage"
            onChange={(e) => handleFileChange(e, setLandingPageImageFile)}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block font-semibold">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={applicationData.contactEmail}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={applicationData.phoneNumber}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={applicationData.address}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Enter your address"
          />
        </div>

        {/* Payment Link */}
        <div>
          <label className="block font-semibold">Payment Link</label>
          <input
            type="text"
            name="paymentLink"
            value={applicationData.paymentLink}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full py-2 px-3"
            placeholder="Add Payment Link"
          />
        </div>

        {/* Footer Background */}
        <div>
          <label className="block font-semibold">Footer Background</label>
          <input
            type="text"
            name="footerBackground"
            value={applicationData.footerBackground}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        {/* Navbar Background */}
        <div>
          <label className="block font-semibold">Navigation Bar Background</label>
          <input
            type="text"
            name="navbarBackground"
            value={applicationData.navbarBackground}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full py-2 px-3"
          />
        </div>

        {/* Services */}
        <div>
          <label className="block font-semibold">Services</label>
          <textarea
            name="services"
            value={applicationData.services}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full py-2 px-3 h-24"
          ></textarea>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-6 rounded mt-4"
      >
       {loading ? "Please wait .." : "Save Setting"} 
      </button>
    </div>
  );
};

export default CreateApplication;
