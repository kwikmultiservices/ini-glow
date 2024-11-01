// components/ProductPage.tsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
  orderBy,
  QueryConstraint,
} from "firebase/firestore";
import { auth, database } from "../firebase"; // Make sure to import your Firebase setup
import "tailwindcss/tailwind.css";
import { formatNumber } from "../Services/Utility";
import { Product } from "../Services/interface";
import { useCart } from "../Services/CartContext";
import { Link, useNavigate } from "react-router-dom";

const ShowOnlyCategory: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [page, setPage] = useState(1);
  const { addToCart } = useCart(); // Using CartContext for cart actions
  const navigate = useNavigate()
  const PRODUCTS_PER_PAGE = 12;

  // Fetch Categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesSnapshot = await getDocs(
        collection(database, "categories")
      );
      const categoryList = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };

    fetchCategories();
  }, [products]);


  const handleAddToCart = (item: Product) => {
  
    addToCart(item);
  };

  return (
    <div className=" mx-auto py-10 px-2">
      <div className="gap-6">
        {/* Category List */}
        <div className="col-span-1">
          <div className="w-full flex justify-between items-center">
           <div className=""></div>
          <h3 className="text-primary uppercase font-extrabold text-[2rem] text-center mb-4">Collection</h3>
          <Link to='/store' className="text-end">
            see all
          </Link>
          </div>
          <ul>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer py-2 ${
                    selectedCategory === category.name
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                >
                  <img
                    src={category.imageUrl} // Assuming each product has a 'src' property for the image
                    // Use alt if available, fallback to product name
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 flex justify-center items-center  bg-opacity-50  hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-[#95725A] text-white py-2 px-4 rounded-md"
                      onClick={() => navigate(`/store`)}
                    >
                      {category.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>

      
          </ul>
        </div>

      </div>

    
    </div>
  );
};

export default ShowOnlyCategory;
