import React, { useEffect, useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '../firebase'; // Correct import
import { getRandomString } from '../Services/GetRandomNumber';
import { getApplication, getusers } from '../Services/GetUser.service';
import Navbar from '../comp/Navbar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import { Applicationdata } from '../Services/interface';

const UserRegistration: React.FC = () => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [Application, setapplication] = useState<Applicationdata>()
  useEffect(() => {
     getApplication(null, (postData: any) => {
      setapplication(postData)
   
    });
  }, [])
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
        vc:password
      };
  
      // Save user data in Firestore
      await setDoc(doc(database, 'user', user.id), user);
  
      setMessage('Registration successful. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <>

<Navbar/>
<div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
        <div className="text-center flex justify-center items-center flex-col">
          <img src={Application?.logo} alt=""  className='h-[10vh]'/>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md border rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Register</h2>
          {message && (
          <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded">
            {message}
          </div>
        )}

          <form>
          <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                onChange={(e) =>setLastname(e.target.value)}
                placeholder="Enter last Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter last Name"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
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
              {loading ? "processing" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
    
  
  
   </>
  );
};

export default UserRegistration;
