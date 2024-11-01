import React, { useState, useEffect } from "react";
import moment from "moment"; // Ensure you import moment for date formatting
import { Transaction } from "../Services/interface";
import { getContact } from "../Services/GetUser.service";

  
  const TransactionLog: React.FC = () => {
  const itemsPerPage = 10;
  const [contact, setcontact] = useState([])

  const getUsers = async()=>{
   
    
    getContact("",(res:any)=>{
      let data = res
        setcontact(data)
    })
  }

  useEffect(() => {
    getUsers()
  
  }, []);

  



  return (
    <div>
      <div className="relative overflow-x-auto w-full mt-6">
        <p>Transaction History</p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 z-0">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">S/N</th>
              <th scope="col" className="px-4 py-3">Created</th>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3 text-center">message</th>
              
            </tr>
          </thead>
          <tbody>
            {contact?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-3">No logs available.</td>
              </tr>
            ) : (
              contact.map((user:any, id) => (
                <tr key={user.id} className="border border-[#43424285] text-center">
                  <td className="py-3 px-4 text-[0.8rem] md:text-sm">{id+1}</td>
                  <td className="text-[0.8rem] md:text-sm">{moment(user.created).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="text-[0.8rem] md:text-sm">{user.name} </td>
                  <td className="table-cell text-center text-[0.8rem] md:text-sm">{user.message}</td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

 

    </div>
  );
};

export default TransactionLog;
