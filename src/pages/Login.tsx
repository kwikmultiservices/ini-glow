// src/components/Login.tsx
import React, { useEffect, useState } from 'react';

import { getApplication, getusers } from '../Services/GetUser.service';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Navbar from '../comp/Navbar';
import { User } from '../Interface/MainInterface';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth
import { Applicationdata } from '../Services/interface';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [Application, setapplication] = useState<Applicationdata>()
  useEffect(() => {
     getApplication(null, (postData: any) => {
      setapplication(postData)
   
    });
  }, [])
  const login = async (email: string, password: string) => {
    if (email === '' || password === '') {
      window.alert('Email and password are required');
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // You can store the user's token or any other info as needed
      window.localStorage.setItem('token',  user.uid);
      toast.success('Login successful');

      // Redirect to the dashboard
      window.location.href = '/auth/dashboard';
    } catch (error: any) {
      // Handle authentication errors
      const errorMessage = error.message;
      toast.error(`Login failed: ${errorMessage}`);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
   <>
    <Navbar/>
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="text-center flex justify-center items-center flex-col">
          <img src={Application?.logo} alt=""  className='h-[10vh]'/>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md border rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">Login</h2>
          <form>
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
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
            >
              {loading ? "........" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
    
   </>
  );
};

export default Login;
