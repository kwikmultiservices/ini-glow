import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, database } from '../firebase'; // Correct import
import { getRandomString } from '../Services/GetRandomNumber';
import { getusers } from '../Services/GetUser.service';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register: React.FC = () => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (
      !firstname ||
      !lastname ||
      !email ||
      !number ||
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
        permission: 'super_admin',
        wallet: 0,
        created: serverTimestamp(),
        amountSpend: 0,
        accountNumber: "30"+getRandomString(8, '1234567890'),
        totalRequest: 0,
        totalSpent: 0,
        vc:password,
        image:""
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

    <div
      className="min-h-screen flex items-center justify-center bg-black"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold  text-center">Register</h2>
        {message && (
          <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="+123 - 999 - 999"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <span>Already have an account?</span>
            <span
              className="text-blue-600 cursor-pointer ml-1"
              onClick={handleLogin}
            >
              Login
            </span>
          </div>

          <button
            type="submit"
            className={`w-full p-2 bg-black text-white rounded ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  
   </>
  );
};

export default Register;
