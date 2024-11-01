import React, { useState, useEffect } from "react";
import moment from "moment";
import { BankAccountDetails, Transaction } from "../Services/interface";
import { addDoc, collection, doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import { User } from "../Interface/MainInterface";
import { useNavigate } from "react-router-dom";

interface UserProps {
  log?: BankAccountDetails[];
  getUsers: () => void;
  user:User
  isAdmin: boolean; // Added to determine if the user is an admin
}

const TransactionLog: React.FC<UserProps> = ({ log = [], getUsers, isAdmin, user }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<BankAccountDetails[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<BankAccountDetails | null>(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    paginateLogs(currentPage);
  }, [currentPage]);

  const paginateLogs = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLogs = log.slice(startIndex, endIndex);
    setPaginatedLogs(currentLogs);
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < log.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const confirmTransaction = async (transactionId:BankAccountDetails) => {
    try {
      // Reference to the transaction document in Firestore
      const transactionDocRef = doc(database, "transfers", transactionId.id);
  
      // Update the transaction document to mark it as confirmed and closed
      await updateDoc(transactionDocRef, {
        status: "confirmed",
        closed: true,
       // Optionally add a timestamp for when it was confirmed
      });
      console.log(transactionId.amount)

      await addDoc(collection(database, "transactions"), {
        userId: user.id,
        amount: transactionId.amount,
        created: serverTimestamp(),
        type:transactionId.amount < 0 ? "debit" : "credit",
        custoer:transactionId.accountName,
        balance:transactionId.balance
      });

  
      console.log("Transaction confirmed and closed successfully");
    } catch (error) {
      console.error("Error confirming the transaction:", error);
      throw error; // Re-throw error to handle it in calling function
    }
  };
  const updateUserBalance = async (customerId: string, amount: number) => {
    setLoading(true)
    try {
      // Reference to the user document in Firestore
      const userDocRef = doc(database, "user", customerId);
  
      // Retrieve the user document
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        // Update the user's balance using the increment function
        await updateDoc(userDocRef, {
          wallet: increment(amount)
        });
       
      } else {
        console.log("User does not exist");
        throw new Error("User does not exist");
      }
    } catch (error) {
      console.error("Error updating user balance:", error);
      throw error; // Re-throw error to handle it in calling function
    }
    setLoading(false)
  };

  const handleConfirm = async (transaction: BankAccountDetails) => {

    try {
      // 1. Update the user's balance
      await updateUserBalance(transaction.userId, transaction.amount);

      // 2. Create a new transaction for the confirmed transfer
      await confirmTransaction(transaction);

      // 3. Mark the original transaction as closed
      getUsers(); // Refresh the data
      closeModal()
      
    } catch (error) {
      console.error("Error confirming transaction:", error);
    }
  };

  const rejectTransaction = async (transactionId: string) => {
    
    try {
      // Reference to the transaction document in Firestore
      const transactionDocRef = doc(database, "transfers", transactionId);
  
      // Update the transaction document to mark it as rejected and closed
      await updateDoc(transactionDocRef, {
        status: "rejected",
        closed: true,
      });
      closeModal()
    } catch (error) {
      console.error("Error rejecting the transaction:", error);
      throw error; // Re-throw error to handle it in calling function
    }
  };
  

  const handleReject = async (transaction: BankAccountDetails) => {
    setLoading(true)
    try {
      // 1. Mark the transaction as closed without modifying the balance
      await rejectTransaction(transaction.id);

      getUsers(); // Refresh the data
  
      
    } catch (error) {
      console.error("Error rejecting transaction:", error);
    }
    setLoading(false)
  };

  const openModal = (transaction: BankAccountDetails) => {
    setSelectedTransaction(transaction);
    // Logic to open modal (e.g., set a modal state to true)
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    // Logic to close modal (e.g., set a modal state to false)
  };


  return (
    <div>
      <button
        onClick={() =>navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="relative overflow-x-auto w-full mt-6">
        <p>Transfer History</p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-0">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">S/N</th>
              <th scope="col" className="px-4 py-3">Created</th>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Amount</th>
              <th scope="col" className="px-4 py-3">Bank</th>
              <th scope="col" className="px-4 py-3">Type</th>
              <th scope="col" className="px-4 py-3">status</th>
              {isAdmin && <th scope="col" className="px-4 py-3 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {log.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3">No logs available.</td>
              </tr>
            ) : (
              log.map((transaction, id) => (
                <tr key={transaction.id} className="border border-[#43424285]">
                  <td className="py-3 px-4 text-[0.8rem] md:text-sm">{(currentPage - 1) * itemsPerPage + id + 1}</td>
                  <td className="text-[0.8rem] md:text-sm">{moment(transaction.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="text-[0.8rem] md:text-sm">{transaction.accountName}</td>
                  <td className="text-[0.8rem] md:text-sm">{transaction.amount}</td>
                  <td className="text-[0.8rem] md:text-sm">{transaction.bankName}</td>
                                    <td className="table-cell text-[0.8rem] md:text-sm">{transaction.transferType}</td>
                  <td className="table-cell text-[0.8rem] md:text-sm">{transaction.status}</td>
                  {isAdmin && (
                    <td className="table-cell text-center">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => openModal(transaction)}
                      >
                        Action
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-5 mt-4">
        <button
          onClick={handlePrevPage}
          
          disabled={currentPage === 1 || loading}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= log.length || loading}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Modal for Confirm/Reject Action */}
      {selectedTransaction && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm or Reject Transaction</h3>
            <p>Are you sure you want to take action on this transaction? amount: {selectedTransaction.amount}, customer name : {selectedTransaction.accountName}</p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={loading}
                onClick={() => {
                  handleConfirm(selectedTransaction);
                 
                }}
              >
               {loading ? "Please wait" : "Confirm"} 
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                disabled={loading}
                onClick={() => {
                  handleReject(selectedTransaction);
                 
                }}
              >
               {loading ? "Please wait" : "Reject"} 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionLog;
