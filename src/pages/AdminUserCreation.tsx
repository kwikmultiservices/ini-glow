import React, { useEffect, useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../firebase"; // Correct import
import { getRandomString } from "../Services/GetRandomNumber";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { FaBell, FaBars } from "react-icons/fa"; // Added FaBars for the open button
import { FaUserCircle } from "react-icons/fa"; // User fallback icon
import SideMenu from "../comp/SideMenu";
import { getuser, getusers } from "../Services/GetUser.service";
import { User } from "../Interface/MainInterface";
import { BiLogOut, BiSearch } from "react-icons/bi";
import { uploadFile } from "../Services/Upload.service";

const AdminCreateNewuser: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); 
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const [users, setusers] = useState<User[]>();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [role, setRole] = useState<string>("user"); // Add role state with default "user"
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [productImages, setProductImages] = useState<File>();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password) {
      setMessage("Incomplete information");
      return;
    }


    const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      isThumbnail = false
    ) => {
      const files = e.target.files;
      if (files) {
          setProductImages(files[0]); // max 4 images
        }
      
    };

    getusers(email, (res: any[]) => {
      const existingUser = res.find((user) => user.email === email);
      if (existingUser) {
        window.alert("User already exists");
        return;
      }
    });

    let thumbnailUrl = "";

    // Upload thumbnail
    if (productImages) {
      thumbnailUrl = await uploadFile(productImages, "useerID");
    }

    try {
      setLoading(true);

      // Create user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userAuth = userCredential.user;

      const newUser = {
        id: userAuth.uid, // Use Firebase Auth's UID for user ID
        firstname,
        lastname,
        email,
        phone: number,
        active: true,
        permission: role, // Set permission based on selected role
        wallet: 0,
        created: serverTimestamp(),
        amountSpend: 0,
        accountNumber: "30" + getRandomString(8, "1234567890"),
        totalRequest: 0,
        totalSpent: 0,
        image:thumbnailUrl,
        vc:password,
      };

      // Save user data in Firestore
      await setDoc(doc(database, "user", newUser.id), newUser);

      setMessage("Registration successful");
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
        <SideMenu user={user as User} toggleMenu={toggleMenu} isMobile={isMobile} />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 ${isMenuOpen && !isMobile ? "lg:ml-64" : "ml-0"} transition-all duration-300`}
      >
        <nav className="flex justify-between items-center h-14 px-4 py-8 ">
          <div className="flex items-center">
            {!isMenuOpen && (
              <FaBars className="text-lg cursor-pointer mr-4" onClick={toggleMenu} />
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
            <BiLogOut className="text-lg cursor-pointer text-[2rem] text-black" onClick={handleLogout} />
          </div>
        </nav>

        {/* AdminCreateNewuser content */}
        <div className=" flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-red-600">New User</h2>
            {message && (
              <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded">
                {message}
              </div>
            )}

            <form>
              <div className="mb-4">
                <label htmlFor="firstname" className="block text-gray-700 font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lastname" className="block text-gray-700 font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter Last Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              {user?.permission === "super_admin" && <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                  Role
                </label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                >
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>}

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

       

              <button
                type="submit"
                disabled={loading}
                onClick={handleRegister}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateNewuser;
