import React, { useState } from "react";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "../firebase";
import Navbar from "../comp/Navbar";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../comp/AdminHeader";
import { getRandomString } from "../Services/GetRandomNumber";

interface Product {
  amount: number;
  ownerName: string;
  productName: string;
  description: string;
  imageUrl: string;
  recommendedImages: string[];
  title: string;
  subtitle: string;
}

const ProductUploadForm: React.FC = () => {
  const [product, setProduct] = useState<
    Omit<Product, "imageUrl" | "recommendedImages">
  >({
    amount: 0,
    ownerName: "",
    productName: "",
    description: "",
    title: "",
    subtitle: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [image1, setImage1] = useState<File | null>(null);
  const [recommendedImages, setRecommendedImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage1(e.target.files[0]);
    }
  };

  const handleRecommendedImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setRecommendedImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {

      // Handle main image upload
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `products/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Handle owner image upload
      let OnerimageUrl = "";
      if (image1) {
        const imageRef = ref(storage, `products/${image1.name}`);
        await uploadBytes(imageRef, image1);
        OnerimageUrl = await getDownloadURL(imageRef);
      }

      // Handle recommended images
      const recommendedImageUrls: string[] = [];
      if (recommendedImages.length > 0) {
        for (const file of recommendedImages) {
          const fileRef = ref(storage, `recommended/${file.name}`);
          await uploadBytes(fileRef, file);
          const fileUrl = await getDownloadURL(fileRef);
          recommendedImageUrls.push(fileUrl);
        }
      }
      const data = {
        amount: product.amount,
        ownerName: product.ownerName,
        productName: product.productName,
        description: product.description,
        title: product.title,
        subtitle: product.subtitle,
        imageUrl,
        recommendedImages: recommendedImageUrls,
        ownerImage: OnerimageUrl,
        isActive: true,
        isOutOfStock: false,
        createdAt: serverTimestamp(),
      };

      const id = getRandomString(
        35,
        "123456789qwertyuiopasdfhjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM"
      );
      await setDoc(doc(database, "files", id), data);
      // Set the new document in Firestore with the generated ID

      alert("Product uploaded successfully!");
    } catch (error) {
      console.log(error)
      console.error("Error uploading product:", error);
      alert("Error uploading product");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="text-center text-[2rem] p-5 font-extrabold text-black border-b-2  mb-10">
        Control Panel
      </div>

      <button
        onClick={() => navigate(-1)}
        className="bg-red-500 text-white p-2 rounded-md m-2"
      >
        Back
      </button>

      <form
        className="max-w-md mx-auto p-6 mt-7 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Upload Product</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={product.amount}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Owner Name
          </label>
          <input
            type="text"
            name="ownerName"
            value={product.ownerName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            OwnerImage
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange1}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Recommended Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleRecommendedImagesChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Title (H1)
          </label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Subtitle (H2)
          </label>
          <input
            type="text"
            name="subtitle"
            value={product.subtitle}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2 text-white font-bold rounded-md ${
            uploading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </>
  );
};

export default ProductUploadForm;
