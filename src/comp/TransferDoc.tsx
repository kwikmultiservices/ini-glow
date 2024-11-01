import React, { useState } from 'react';
import { doc, where, setDoc, serverTimestamp, query, collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { userData } from '../Services/GetUser.service';
import { User } from '../Interface/MainInterface';
import { getRandomString } from '../Services/GetRandomNumber';
interface SideMenuProps {
  user: User;
}

const TransferForm: React.FC<SideMenuProps> = ({user}) => {
  const [transferType, setTransferType] = useState<'local' | 'international'>('local');
  const [bankName, setBankName] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [swiftBicIban, setSwiftBicIban] = useState('');
  const [accountName, setAccountName] = useState('');
  const [holderAddress, setHolderAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState('');
  const [pin, setPin] = useState('');
  const [balance, setUSerbalance] = useState("")
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const fetchAccountName = async (accountNumber: string) => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const q = query(collection(database, 'user'), where('accountNumber', '==', accountNumber));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        setErrorMessage('No user found with this account number.');
        return;
      }
  
      const userData = querySnapshot.docs[0].data();
  
      if (userData?.firstname && userData?.lastname) {
        setAccountName(`${userData.firstname} ${userData.lastname}`);
        setUSerbalance(userData.wallet)
      } else {
        setErrorMessage('User data is incomplete.');
      }
    } catch (error) {
      console.error('Error fetching account information:', error);
      setErrorMessage('Error fetching account information.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const id = getRandomString(34,"1234567890qqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM")
    try {
      await setDoc(doc(database, 'transfers', id), {
        bankName,
        bankAddress,
        accountNumber,
        routingNumber,
        swiftBicIban,
        accountName,
        holderAddress,
        amount,
        narration,
        pin,
        transferType,
        userId:user.id,
        id:id,
        balance,
        userRole:user.permission,
        createdAt: serverTimestamp(),
        status: "Pending",
        closed: false,

      });
      setSuccessMessage('Transfer submitted successfully!');
    } catch (error) {
      setErrorMessage('Failed to submit transfer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = () => {
    const token = window.localStorage.getItem("token")
    navigate(`/transfer-history/${token}`);
  };

  return (
   <>
     {user?.permission === "admin" &&  <button
        onClick={handleViewHistory}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        View Transfer History
      </button>}
    <div className="max-w-lg mx-auto p-4">
       
      <h2 className="text-2xl font-bold mb-6">Transfer Form</h2>

  
      <div className="flex items-center mb-4">
        <p className="mr-4 font-medium">Type of Transfer:</p>
        <div className="flex items-center">
          <label className="flex items-center mr-4">
            <input
              type="radio"
              name="transferType"
              value="international"
              checked={transferType === 'international'}
              onChange={() => setTransferType('international')}
              className="mr-2"
            />
            International
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="transferType"
              value="local"
              checked={transferType === 'local'}
              onChange={() => setTransferType('local')}
              className="mr-2"
            />
            Local
          </label>
        </div>
      </div>

     
        <div>
          <label className="block text-sm font-medium">Bank Name:</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Bank Address:</label>
          <input
            type="text"
            value={bankAddress}
            onChange={(e) => setBankAddress(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              if (e.target.value.length === 10) fetchAccountName(e.target.value);
            }}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Routing Number:</label>
          <input
            type="text"
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {transferType === 'international' && (
          <div>
            <label className="block text-sm font-medium">SWIFT/BIC/IBAN:</label>
            <input
              type="text"
              value={swiftBicIban}
              onChange={(e) => setSwiftBicIban(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <p className="text-xs text-gray-500">(For international transfers only)</p>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Account Name:</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Holder's Address:</label>
          <input
            type="text"
            value={holderAddress}
            onChange={(e) => setHolderAddress(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Amount:</label>
          <input
            type="tel"
            placeholder='0'
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Narration:</label>
          <textarea
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">PIN:</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="text-center mt-4">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-6 py-2 rounded ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Submitting...' : 'Submit Transfer'}
          </button>
        </div>
   
    </div>
   </>
  );
};

export default TransferForm;
