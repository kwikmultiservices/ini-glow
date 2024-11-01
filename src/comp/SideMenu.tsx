import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { User } from "../Interface/MainInterface";
import { Link } from "react-router-dom";
import { Applicationdata } from "../Services/interface";
import { getApplication } from "../Services/GetUser.service";
interface SideMenuProps {
  user: User;
  toggleMenu: () => void;
  isMobile: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ user, toggleMenu, isMobile }) => {
  const [Application, setapplication] = useState<Applicationdata>();
  useEffect(() => {
    getApplication(null, (postData: any) => {
      setapplication(postData);
    });
  }, []);
  return (
    <div
      className={`${
        isMobile ? "absolute z-50" : "fixed"
      } w-64 bg-gray-200 text-black h-full top-0 left-0 shadow-lg transition-all duration-300 z-50`}
    >
      <div className="flex justify-center items-center "></div>
      <div className="p-4 flex justify-between items-center">
        <img src={Application?.logo || ""} alt="" className="h-11 w-11 " />
        <FaTimes className="cursor-pointer text-lg" onClick={toggleMenu} />
      </div>
      <div className="h-32 w-32 ml-2 rounded-full flex items-center justify-center bg-gray-800 overflow-hidden text-white text-3xl font-bold">
        {user?.image ? (
          <img
            src={user.image}
            alt="User profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-white text-center">
            {user?.firstname[0]}
            {user?.lastname[0]}
          </span>
        )}
      </div>
      <ul className="mt-10 pb-4">
        <Link to="/auth/dashboard">
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer">
            Dashboard
          </li>
        </Link>

        <Link to="/auth/User">
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer">User</li>
        </Link>

        <Link to="/auth/product/dashboard">
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer">
            Product
          </li>
        </Link>

        <Link to="/auth/account-support/dashboard">
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer">
            Setting
          </li>
        </Link>

        <Link to="/auth/support">
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer">
            Support
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideMenu;
