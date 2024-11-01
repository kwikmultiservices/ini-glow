import React, { useEffect, useState } from "react";
import { FaBell, FaBars } from "react-icons/fa"; // Added FaBars for the open button
import { FaUserCircle } from "react-icons/fa"; // User fallback icon
import SideMenu from "../comp/SideMenu";
import { getuser, getusers } from "../Services/GetUser.service";
import { User } from "../Interface/MainInterface";
import UserLog from "../comp/UserLog";
import { Link } from "react-router-dom";
import { BiLogOut, BiSearch } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { MdAdd } from "react-icons/md";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
 // Assuming you have a modal component
import { toast } from "react-toastify"; // For notifications
import { database } from "../firebase";
import Modal from "../comp/Model";
import { uploadFile } from "../Services/Upload.service";
import ProductLog from "../comp/ProductLog";
import { Product } from "../Services/interface";
import { TimestampDate } from "timestamp-date";

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const [users, setusers] = useState<Product[]>();
  const [categories, setCategories] = useState<any[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const timestampDate = new TimestampDate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const fetchProduc4 = async () => {
    const querySnapshot = await getDocs(collection(database, "products"));
    const categoriesData = querySnapshot.docs.map((doc) => ({
      ...doc.data() as Product,
    }));
    setusers(timestampDate.parseTimestampToDate(categoriesData));
  };

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(database, "categories"));
    const categoriesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(categoriesData);
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(database, "categories", id));
      toast.success("Category deleted successfully");
      fetchCategories(); // Refresh categories after deletion
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const createCategory = async () => {
    if (!newCategoryName || !categoryImage) {
      toast.error("Please provide a name and an image");
      return;
    }
    const imageUrl = await uploadFile(categoryImage, "product-images");
    try {
      const categoryRef = await addDoc(collection(database, "categories"), {
        name: newCategoryName,
        imageUrl:imageUrl, // Replace with actual image upload URL
      });
      toast.success("Category created successfully");
      fetchCategories(); // Refresh categories after adding
      setIsNewCategoryModalOpen(false); // Close modal
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  useEffect(() => {
    fetchProduc4();
    getuser("", (res: User[]) => {
      const data = res[0];
      setUser(data);
    });

    checkIsMobile(); // Check initially when the component loads
    window.addEventListener("resize", checkIsMobile); // Listen for screen resize

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("token"); // Remove token from local storage
    window.location.href = "/login"; // Redirect to the login page
  };

  return (
    <div className="h-screen flex">
      {/* Side Menu */}
      {isMenuOpen && (
        <SideMenu
          user={user as User}
          toggleMenu={toggleMenu}
          isMobile={isMobile}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isMenuOpen && !isMobile ? "lg:ml-64" : "ml-0"
        } transition-all duration-300`}
      >
        <nav className="flex justify-between items-center h-14 px-4 py-8">
          <div className="flex items-center">
            {!isMenuOpen && (
              <FaBars
                className="text-lg cursor-pointer mr-4"
                onClick={toggleMenu}
              />
            )}
          </div>
          <div className="flex items-center space-x-2 border-b border-gray-400 py-2">
            <BiSearch className="text-gray-500" /> {/* Search Icon */}
            <input
              type="text"
              placeholder="Search Something"
              className="outline-none text-gray-500 w-full placeholder-gray-500"
            />
          </div>
          <div className="flex items-center text-[1rem] space-x-4">
            <p>View Store</p>
            <BiLogOut
              className="text-lg cursor-pointer text-[2rem] text-black"
              onClick={handleLogout}
            />
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="p-4 h-[85vh] overflow-y-scroll scrollbar-hide">
          <h1 className="text-2xl font-bold">Product</h1>
          <span>Product Setting</span>

          <div className="flex justify-end space-x-4">
            <Link to="/auth/create-new-Product/dashboard">
              <button
                className={`${
                  user?.active ? "bg-green-500" : "bg-green-500"
                } text-white px-4 py-2 rounded mt-5 flex space-x-3 items-center`}
              >
                <MdAdd /> Create Product
              </button>
            </Link>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-5 flex space-x-3 items-center"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              <MdAdd /> Categories
            </button>
          </div>

          <ProductLog log={users as Product[]}  />
        </div>
      </div>

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <Modal onClose={() => setIsCategoryModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="border px-4 py-2">{category.name}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteCategory(category.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-5 flex space-x-3 items-center"
            onClick={() => setIsNewCategoryModalOpen(true)}
          >
            <MdAdd /> Create New Category
          </button>
        </Modal>
      )}

      {/* New Category Modal */}
      {isNewCategoryModalOpen && (
        <Modal onClose={() => setIsNewCategoryModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={createCategory}
          >
            Save
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
