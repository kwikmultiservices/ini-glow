import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa"; // Added FaBars for the open button
import SideMenu from "../comp/SideMenu";
import { getuser } from "../Services/GetUser.service";
import { contact, User } from "../Interface/MainInterface";
import { Link } from "react-router-dom";
import { BiLogOut, BiSearch } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { MdAdd } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import { database } from "../firebase";
import ContactLog from "../comp/ContactLog";

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const [contacts, setContacts] = useState<contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<contact[]>([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const fetchContacts = async () => {
    const querySnapshot = await getDocs(collection(database, "newsletterSubmissions"));
    const contactsData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Make sure to handle missing fields, if any, by providing default values
      return {
        id: doc.id, // Firestore document ID
        email: data.email || '',  // Provide empty string as default if missing
        fullName: data.fullName || '',  // Handle missing fullName
        message: data.message || '',  // Handle missing message
        phone: data.phone || '',  // Handle missing phone
        type: data.type || '',  // Handle missing type
      } as contact;
    });
 console.log(contactsData)
    setContacts(contactsData);
    setFilteredContacts(contactsData); // Set default to all contacts
  };

  useEffect(() => {
    getuser("", (res: User[]) => {
      const data = res[0];
      setUser(data);
    });

    checkIsMobile(); // Check initially when the component loads
    window.addEventListener("resize", checkIsMobile); // Listen for screen resize

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    fetchContacts(); // Fetch contacts on component mount
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("token"); // Remove token from local storage
    window.location.href = "/login"; // Redirect to the login page
  };

  // Filtering logic based on the button clicked
  const filterContacts = (type: string) => {
    if (type === "all") {
      setFilteredContacts(contacts); // Show all contacts
    } else {
      const filtered = contacts.filter((contact) => contact.type === type);
      setFilteredContacts(filtered);
    }
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
        className={`flex-1 ${isMenuOpen && !isMobile ? "lg:ml-64" : "ml-0"} transition-all duration-300`}
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
          <h1 className="text-2xl font-bold">Notification</h1>
          <span>Messages</span>

          <div className="flex justify-start space-x-4">
            {/* Filter buttons */}
            <button
              className={`${
                user?.active ? "bg-gray-500" : "bg-green-500"
              } text-white px-4 py-2 rounded mt-5 flex space-x-3 items-center`}
              onClick={() => filterContacts("newsletter")}
            >
              <MdAdd /> Newsletter
            </button>

            <button
              className={`${
                user?.active ? "bg-gray-500" : "bg-green-500"
              } text-white px-4 py-2 rounded mt-5 flex space-x-3 items-center`}
              onClick={() => filterContacts("contact")}
            >
              <MdAdd /> Contact form
            </button>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-5 flex space-x-3 items-center"
              onClick={() => filterContacts("all")}
            >
              <MdAdd /> All
            </button>
          </div>

          {/* Display the filtered contacts */}
          <ContactLog log={filteredContacts} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
