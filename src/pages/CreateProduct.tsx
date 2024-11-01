import React, { useEffect, useState } from "react";

import { FaBars } from "react-icons/fa"; // Added FaBars for the open button // User fallback icon
import SideMenu from "../comp/SideMenu";
import { User } from "../Interface/MainInterface";
import { formatNumber } from "../Services/Utility";
import { Transaction } from "../Services/interface";
import { Link } from "react-router-dom";
import { BiLogOut, BiSearch } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import ProductForm from "../comp/ProductComponent";

const CreateProduct: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [transaction, setTransaction] = useState<Transaction[]>();
  const [totalAmount, setTotalTransfer] = useState(0);
  const [totalLoad, setTotalTransferLoan] = useState(0);



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
        <nav className="flex justify-between items-center h-14 px-4 py-8 ">
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
            <BiLogOut className="text-lg cursor-pointer  text-[2rem] text-black" onClick={handleLogout}/>
          </div>
        </nav>

        {/* Dashboard content */}
        <div className="p-4 h-[85vh] overflow-y-scroll scrollbar-hide">
          <h1 className="text-2xl font-bold">New Product</h1>
          <span>Create a new product</span>

            <ProductForm/>
        </div>
      
      </div>
    </div>
  );
};

export default CreateProduct;
