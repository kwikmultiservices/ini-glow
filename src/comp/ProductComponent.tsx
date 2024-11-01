import React, { useEffect, useState } from "react";

import { collection, addDoc, setDoc, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { uploadFile } from "../Services/Upload.service";
import { database } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getRandomString } from "../Services/GetRandomNumber";

const ProductForm = () => {
  // State for each field
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [productSummary, setProductSummary] = useState("");
  const [price, setPrice] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productThumbnail, setProductThumbnail] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productCode, setProductCode] = useState("");
  const [status, setStatus] = useState("In stock");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(database, "categories"));
    const categoriesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(categoriesData);
  };

  useEffect(() => {
    fetchCategories()
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isThumbnail = false
  ) => {
    const files = e.target.files;
    if (files) {
      if (isThumbnail) {
        setProductThumbnail(files[0]);
      } else {
        setProductImages(Array.from(files).slice(0, 4)); // max 4 images
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let thumbnailUrl = "";
      const imageUrls: string[] = [];

      // Upload thumbnail
      if (productThumbnail) {
        thumbnailUrl = await uploadFile(productThumbnail, "thumbnails");
      }

      // Upload product images
      for (const image of productImages) {
        const imageUrl = await uploadFile(image, "product-images");
        imageUrls.push(imageUrl);
      }

      const id = getRandomString(
        35,
        "1234567890asdfhjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM"
      );
      // Save product data to Firestore
      await setDoc(doc(database, "products", id), {
        productName,
        category,
        id,
        productSummary,
        price: parseFloat(price),
        salesPrice: parseFloat(salesPrice),
        Storck:parseFloat(quantity),
        quantity:1 ,
        productDescription,
        productThumbnail: thumbnailUrl,
        productImages: imageUrls,
        productCode,
        status,
        createdAt: serverTimestamp(),
      });

      toast.success("Product added successfully!");
      // Clear the form after submission (Optional)
      // setProductName("");
      // setCategory("");
      // setProductSummary("");
      // setPrice("");
      // setSalesPrice("");
      // setQuantity("");
      // setProductDescription("");
      // setProductThumbnail(null);
      // setProductImages([]);
      // setProductCode("");
      // setStatus("In stock");
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("Failed to add product.");
    }
    setLoading(false);
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" pt-6 bg-white w-full m rounded-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Section */}
          <div className=" border border-gray-300  rounded-md">
            <h2 className="text-lg font-medium mb-4  p-4 bg-slate-300 ">
              General
            </h2>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter Product Name"
                required
              />
            </div>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">
                Product Summary
              </label>
              <textarea
                value={productSummary}
                onChange={(e) => setProductSummary(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter product Summary"
              />
            </div>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter product price"
              />
            </div>

            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">
                discount Price
              </label>
              <input
                type="tel"
                value={salesPrice}
                onChange={(e) => setSalesPrice(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter product sales price"
              />
            </div>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="tel"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter product quantity"
              />
            </div>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">
                Product Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter product description"
              />
            </div>
          </div>

          {/* Product Image Section */}
          <div className=" border border-gray-300  rounded-md">
            <h2 className="text-lg font-medium mb-4  p-4 bg-slate-300 ">
              Product Image
            </h2>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">
                Product Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, true)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">
                Product Images (max 4)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, false)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <h2 className="text-lg font-medium mb-4  p-4 bg-slate-300 ">
              Inventory
            </h2>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">Product Code</label>
              <input
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter product code"
              />
            </div>
            <div className="mb-4 p-3">
              <label className="block text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="In stock">In stock</option>
                <option value="Out of stock">Out of stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Back
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded-md shadow-md"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
            >
              {loading ? "Please wait" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
