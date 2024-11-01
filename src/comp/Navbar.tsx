import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { getApplication } from "../Services/GetUser.service";
import { Applicationdata } from "../Services/interface";
import CartIcon from "./CartIcon";

const Navbar: React.FC = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [Application, setapplication] = useState<Applicationdata>();

  useEffect(() => {
    getApplication(null, (postData: any) => {
      setapplication(postData);
    });
  }, []);

  return (
    <header
      className="flex justify-between items-center py-4 px-8 relative"
      style={{ backgroundColor: Application?.navbarBackground }}
    >
      {/* Logo */}
      <div className="logo">
        <Link to="/" className="text-xl font-bold" onClick={closeMobileMenu}>
          <img src={Application?.logo} alt="Brand Logo" className="h-16" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 text-lg">
        <Link to="/" className="hover:text-primary" onClick={closeMobileMenu}>
          Home
        </Link>
        <Link to="/store" className="hover:text-primary" onClick={closeMobileMenu}>
          Shop
        </Link>
        <Link to="/who-we-are" className="hover:text-primary" onClick={closeMobileMenu}>
          About
        </Link>
        <Link to="/contact-us" className="hover:text-primary" onClick={closeMobileMenu}>
          Contact
        </Link>
      </nav>

      {/* Icons (Search and Cart) */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="hover:text-primary">
          <FaSearch className="text-xl" />
        </button>
        <CartIcon />
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center" onClick={handleClick}>
        {click ? (
          <AiOutlineClose className="text-3xl" />
        ) : (
          <BiMenuAltRight className="text-3xl" />
        )}
      </div>

      {/* Mobile Navigation */}
      <ul
        className={`absolute top-full left-0 w-full flex flex-col items-start space-y-6  z-40 py-8 transition-all duration-500 ease-in-out ${
          click ? "opacity-100" : "opacity-0 hidden"
        } md:hidden`}
        style={{
          backgroundColor: Application?.navbarBackground,
          paddingLeft: "20px", // Add padding here to prevent items from touching the edge
        }}
      >
        <li>
          <Link to="/" className="text-lg px-4" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" className="text-lg px-4" onClick={closeMobileMenu}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/who-we-are" className="text-lg px-4" onClick={closeMobileMenu}>
            About Us
          </Link>
        </li>
        <li>
          <Link to="/faq" className="text-lg px-4" onClick={closeMobileMenu}>
            FAQ
          </Link>
        </li>
        <li>
          <Link to="/contact-us" className="text-lg px-4" onClick={closeMobileMenu}>
            Contact Us
          </Link>
        </li>
        {/* Add Cart Icon in Mobile View */}
        <li>
          <div className="flex items-center space-x-4 px-4">
            <button className="hover:text-primary">
              <FaSearch className="text-xl" />
            </button>
            <CartIcon />
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
