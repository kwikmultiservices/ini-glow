import React, { useState, useEffect } from "react";
import moment from "moment"; // Ensure you import moment for date formatting
import { Transaction } from "../Services/interface";

interface UserProps {
    log?: Transaction[]; // Change to optional in case it's undefined
    getUsers:()=>void
  }
  
  const TransactionLog: React.FC<UserProps> = ({ log = [] , getUsers}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<Transaction[]>([]);


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




  return (
    <div>
      <div className="relative overflow-x-auto w-full mt-6">
        <p>Transaction History</p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-0">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">S/N</th>
              <th scope="col" className="px-4 py-3">Created</th>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3 text-center">Amount</th>
              <th scope="col" className="px-4 py-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {log.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-3">No logs available.</td>
              </tr>
            ) : (
              log.map((user, id) => (
                <tr key={user.id} className="border border-[#43424285]">
                  <td className="py-3 px-4 text-[0.8rem] md:text-sm">{(currentPage - 1) * itemsPerPage + id + 1}</td>
                  <td className="text-[0.8rem] md:text-sm">{moment(user.created).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="text-[0.8rem] md:text-sm">{user.custoer} </td>
                  <td className="table-cell text-center text-[0.8rem] md:text-sm">{user.amount}</td>
                  <td className="table-cell text-[0.8rem] md:text-sm">{user.type}</td>
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
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= log.length}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default TransactionLog;
