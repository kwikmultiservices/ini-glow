import React, { useState, useEffect } from "react";
import { contact, User } from "../Interface/MainInterface";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import Modal from "./Model";
import { database } from "../firebase";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

interface UserProps {
  log?: contact[]; 
 
}

const ContactLog: React.FC<UserProps> = ({ log = [] }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<contact[]>([]);

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

  return (
    <div>
      <div className="relative overflow-x-auto w-full mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="py-3 px-3 text-left">ID</th>
            <th scope="col" className="py-3 px-3 text-left">Name</th>
              <th scope="col" className="py-3 px-3 text-left">Email</th>  
              <th scope="col" className="py-3 px-3 text-left">Message</th>
              <th scope="col" className="py-3 px-3 text-left">Phone Number</th>
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
                    {id + 1}
                  </td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    {user.fullName}
                  </td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    {user.email}
                  </td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    {user.message}
                  </td>

                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    {user.phone}
                  </td>
              
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default ContactLog;
