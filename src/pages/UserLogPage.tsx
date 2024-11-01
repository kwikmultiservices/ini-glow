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

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const [users, setusers] = useState<User[]>();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const getUsers = async () => {
    await getusers("", (res: User[]) => {
      setusers(res);
    });
  };

  useEffect(() => {
    getUsers();
    getuser("", (res: User[]) => {
      const data = res[0];
      setUser(data);
    });

    checkIsMobile(); // Check initially when the component loads
    window.addEventListener("resize", checkIsMobile); // Listen for screen resize

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
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
          <h1 className="text-2xl font-bold">User</h1>
          <span>User Setting</span>

          <div className="flex justify-end gap-4">
          <div className="">
          <Link to="/auth/create-new-account/dashboard">
          <button
              onClick={() => {}}
              className={`${
                user?.active ? "bg-green-500" : "bg-green-500"
              } text-white px-4 py-2 rounded mt-5 flex space-x-3 items-center`}
            >
             <MdAdd/> Add User
            </button>
          </Link>
          </div>
          </div>

          <UserLog log={users as User[]} getUsers={getUsers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
