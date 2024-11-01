import React, { useEffect, useState } from "react";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../firebase'; // Correct import
import { getRandomString } from '../Services/GetRandomNumber';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { auth } from '../firebase'; 
import { FaBell, FaBars } from "react-icons/fa"; // Added FaBars for the open button
import { FaUserCircle } from "react-icons/fa"; // User fallback icon
import SideMenu from "../comp/SideMenu";
import { getuser, getusers } from "../Services/GetUser.service";
import { User } from "../Interface/MainInterface";import { BiLogOut, BiSearch } from "react-icons/bi";
import CreateApplication from "../comp/CreateApplication";
;



const Support: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const [users, setusers] = useState<User[]>();
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password 
    ) {
      setMessage('Incomplete information');
      return;
    }
  
    getusers(email, (res: any[]) => {
      const existingUser = res.find((user) => user.email === email);
      if (existingUser) {
        window.alert('User already exists');
        return;
      }
    });
  
    try {
      setLoading(true);
  
      // Create user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userAuth = userCredential.user;
  
      const user = {
        id: userAuth.uid,  // Use Firebase Auth's UID for user ID
        firstname,
        lastname,
        email,
        phone: number,
        active: true,
        permission: 'user',
        wallet: 0,
        created: serverTimestamp(),
        amountSpend: 0,
        accountNumber: "30"+getRandomString(8, '1234567890'),
        totalRequest: 0,
        totalSpent: 0,
      };
  
      // Save user data in Firestore
      await setDoc(doc(database, 'user', user.id), user);
  
      setMessage('Registration successful');
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

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

  const getUserInitial = () => {
    return user?.firstname.charAt(0).toUpperCase();
  };

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

        {/* AdminCreateNewuser content */}
        <div className="p-4 h-[85vh] overflow-y-scroll scrollbar-hide">
          <h1 className="text-2xl font-bold">Settings</h1>
          <span>Application Setting</span>
            <CreateApplication/>
        </div>
      </div>
    </div>
  );
};

export default Support;
