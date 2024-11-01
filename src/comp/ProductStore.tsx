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

const ProductPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [page, setPage] = useState(1);
  const { addToCart } = useCart(); // Using CartContext for cart actions

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

  // Fetch Products from Firestore
  const fetchProducts = async (
    category: string | null,
    reset: boolean = false
  ) => {
    setLoading(true);
    let productsQuery: QueryConstraint[] = [];

    if (category) {
      // Query for products in a specific category
      productsQuery = [
        where("category", "==", category),
        orderBy("createdAt", "desc"), // Add orderBy for createdAt in descending order
        limit(PRODUCTS_PER_PAGE),
      ];
    } else {
      // Query for all products
      productsQuery = [
        orderBy("createdAt", "desc"), // Add orderBy for createdAt in descending order
        limit(PRODUCTS_PER_PAGE),
      ];
    }

    // Add startAfter constraint only if lastVisible is defined
    if (lastVisible) {
      productsQuery.push(startAfter(lastVisible));
    }

    // Execute the query
    const q = query(collection(database, "products"), ...productsQuery);
    const productsSnapshot = await getDocs(q);
    const productList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Set the last visible document for pagination
    setLastVisible(productsSnapshot.docs[productsSnapshot.docs.length - 1]);

    if (reset) {
      setProducts(productList);
    } else {
      setProducts((prev) => [...prev, ...productList]);
    }

    setLoading(false);
  };

  // Fetch products when page or category changes
  useEffect(() => {
    fetchProducts(selectedCategory, true);
  }, [page, selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page
    fetchProducts(category, true);
  };

  const handleAddToCart = (item: Product) => {
  
    addToCart(item);
  };

  return (
    <div className=" mx-auto py-10 px-2">
      <div className="gap-6">
        {/* Category List */}
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">Categories</h3>
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
                      onClick={() => handleCategoryChange(category.name)}
                    >
                      {category.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <li
              className={`cursor-pointer py-2 ${
                !selectedCategory ? "text-blue-500" : "text-gray-700"
              }`}
              onClick={() => handleCategoryChange(null)}
            >
              All Products
            </li>
          </ul>
        </div>

        <div className="min-h-[20vh] flex justify-start md:justify-between items-center flex-wrap">
          <p>
            Showing {page} of {PRODUCTS_PER_PAGE} of {page} Result
          </p>
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => {
              const searchQuery = e.target.value.toLowerCase();
              const filteredProducts = products.filter((product) =>
                product.productName.toLowerCase().includes(searchQuery)
              );
              setProducts(filteredProducts);
            }}
            className="border p-2 rounded"
          />
        </div>

        {/* Product Grid */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {products.map((product, index) => (
              <div className="">
                <div key={index} className="relative ">
                  <img
                    src={product.productThumbnail} // Assuming each product has a 'src' property for the image
                    alt={product.productName} // Use alt if available, fallback to product name
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center  bg-opacity-50  hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-[#95725A] text-white py-2 px-4 rounded-md"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="text-center pb-6">
                  <p className="p-2 text-[#582b15]">{product.productName}</p>
                  <div className="flex gap-3 justify-center items-center">
                    <h1 className="font-extrabold text-[#582b15] underline">
                      &#8358; {formatNumber(product.salesPrice)}
                    </h1>
                    <h1 className="font-extrabold text-gray-400 line-through">
                      &#8358; {formatNumber(product.price)}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-start gap-4 items-center">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="min-h-[10vh] flex justify-between items-center">
          <p>
            Recently Viewed Items
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-8">
            {products.slice(0, 4).map((product, index) => (
              <div className="">
                <div key={index} className="relative ">
                  <img
                    src={product.productThumbnail} // Assuming each product has a 'src' property for the image
                    alt={product.productName} // Use alt if available, fallback to product name
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center  bg-opacity-50  hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="bg-[#95725A] text-white py-2 px-4 rounded-md"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="text-center pb-6">
                  <p className="p-2 text-[#582b15]">{product.productName}</p>
                  <div className="flex gap-3 justify-center items-center">
                    <h1 className="font-extrabold text-[#582b15] underline">
                      &#8358; {formatNumber(product.salesPrice)}
                    </h1>
                    <h1 className="font-extrabold text-gray-400 line-through">
                      &#8358; {formatNumber(product.price)}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </div>
  );
};

export default ProductPage;
