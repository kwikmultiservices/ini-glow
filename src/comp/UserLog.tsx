import React, { useState, useEffect } from "react";
import { User } from "../Interface/MainInterface";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import Modal from "./Model";
import { database } from "../firebase";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

interface UserProps {
  log?: User[]; 
  getUsers: () => void;
}

const UserLog: React.FC<UserProps> = ({ log = [], getUsers }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<User[]>([]);
  const [isCreditDebitModalOpen, setIsCreditDebitModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    paginateLogs(currentPage);
  }, [log]);

  const paginateLogs = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLogs = log.slice(startIndex, endIndex);
    setPaginatedLogs(currentLogs);
  };

  // Function to handle credit or debit action (deleting a user)
  const handleDeleteUser = async () => {
    if (selectedUser) {
      const userDocRef = doc(database, "user", selectedUser.id);
      await deleteDoc(userDocRef);
      setIsCreditDebitModalOpen(false);
      getUsers();
    }
  };

  // Reauthenticate the user before performing sensitive actions
  const reauthenticateUser = async (userId: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    // Check if the user is currently authenticated
    if (user) {
      try {
        // Get user data from Firestore
        const userDocRef = doc(database, "user", userId);
        const userSnapshot = await getDoc(userDocRef);
  
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const vc = userData?.vc; // Assuming 'vc' is stored in the user document
  
          if (vc) {
            // Create credential using the current user's email and the 'vc' from Firestore
            const credential = EmailAuthProvider.credential(user.email!, vc);
  
            // Reauthenticate the user with the credential
            await reauthenticateWithCredential(user, credential);
  
            toast.success("Reauthentication successful.");
            return true; // Successful reauthentication
          } else {
            console.error("VC (password) not found.");
            toast.error("VC not found for the user.");
            return false;
          }
        } else {
          console.error("User not found.");
          toast.error("User not found in the database.");
          return false;
        }
      } catch (error) {
        console.error("Reauthentication failed: ", error);
        toast.error("Reauthentication failed. Please try again.");
        return false;
      }
    }
  
    console.error("No authenticated user found.");
    return false;
  };

  // Function to handle password update
  const handleUpdatePassword = async () => {
    setloading(true)
    if (selectedUser && newPassword) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const isReauthenticated = await reauthenticateUser(selectedUser.id); // Reauthenticate before updating password

        if (isReauthenticated) {
          try {
            await updatePassword(user, newPassword);
              // Update the user document in Firestore with count set to 1
          const userDocRef = doc(database, "user", selectedUser.id);
          await updateDoc(userDocRef, { vc: newPassword});
            toast.success("Password updated successfully!");
          } catch (error) {
            console.error("Error updating password: ", error);
            toast.error("Failed to update password.");
          } finally {
            setIsPasswordModalOpen(false);
            setNewPassword("");
          }
        }
      }
    }
    setloading(false)
  };

  return (
    <div>
      <div className="relative overflow-x-auto w-full mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-3 text-left">Email</th>
              <th scope="col" className="py-3 px-3 text-left">User Name</th>
              <th scope="col" className="py-3 px-3 text-left">Status</th>
              <th scope="col" className="py-3 px-3 text-left">Change Password</th>
              <th scope="col" className="py-3 px-3 text-left">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3 px-3">
                  No logs available.
                </td>
              </tr>
            ) : (
              paginatedLogs.map((user, id) => (
                <tr key={user.id} className="border border-[#43424285]">
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    {user.email}
                  </td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    {user.firstname} {user.lastname}
                  </td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    {user.active ? "Active" : "Suspended"}
                  </td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsPasswordModalOpen(true);
                      }}
                      className=" text-black border border-black px-4 py-2 rounded"
                    >
                      Change Password
                    </button>
                  </td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsCreditDebitModalOpen(true);
                      }}
                      className=" text-black border border-black px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Credit/Debit Modal */}
      {isCreditDebitModalOpen && selectedUser && (
        <Modal onClose={() => setIsCreditDebitModalOpen(false)}>
          <p>
            Are you sure you want to delete {selectedUser.firstname}{" "}
            {selectedUser.lastname}?
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleDeleteUser}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
            >
              Agree
            </button>
            <button
              onClick={() => setIsCreditDebitModalOpen(false)}
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Password Change Modal */}
      {isPasswordModalOpen && selectedUser && (
        <Modal onClose={() => setIsPasswordModalOpen(false)}>
          <h3 className="text-lg font-bold">
            Change Password for {selectedUser.firstname} {selectedUser.lastname}
          </h3>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded w-full mt-4"
          />
       
          <div className="flex space-x-4 mt-4">
            <button
              disabled={loading}
              onClick={handleUpdatePassword}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
             {loading ? "processing" : "Update Password"} 
            </button>
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserLog;
