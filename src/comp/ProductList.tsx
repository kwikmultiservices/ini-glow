import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { TimestampDate } from "timestamp-date";
import { getAllProducts } from "../Services/GetUser.service";
import { getTimeAgo } from "../Services/Utility";
import { Product } from "../Services/interface";
import AdminHeader from "./AdminHeader";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../firebase";

const ProductList = () => {
  const [users, setUsers] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [debouncedScroll, setDebouncedScroll] = useState<number | null>(null);
  const [search, setsearch] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const timestampDate = new TimestampDate();

  const fetchUsers = async (page: number) => {
    if (isFetching) return;
    setIsFetching(true);
    setIsLoading(true);

    try {
      await getAllProducts("", (result: Product[]) => {
        const queryuser = timestampDate.parseTimestampToDate(result) as any;
        setUsers(result);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight >= document.body.offsetHeight - 50 &&
      hasMore &&
      !isFetching
    ) {
      if (debouncedScroll !== null) {
        clearTimeout(debouncedScroll);
      }

      const timeout = setTimeout(() => {
        fetchUsers(users.length / 10 + 1);
      }, 200);
      setDebouncedScroll(timeout as any);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (debouncedScroll !== null) {
        clearTimeout(debouncedScroll);
      }
    };
  }, [hasMore, isFetching, users.length, debouncedScroll]);

  const handleProductSelected = (product: Product) => {
    // Navigate to the product detail page with the selected product's ID
    navigate(`/products/${product.productName}`, { state: { product } });
  };

  
  const deleteProduct = async (id: string) => {
    try {
      const productRef = doc(database, "files", id); // Assuming your products are stored in a 'products' collection
      await deleteDoc(productRef);
      fetchUsers(1)
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <></>
    // <div className="bg-white min-h-[100vh] pt-6">
    //   <div className="mb-5 gap-1 mx-4 item-center flex item-center justify-between">
    //     <div className="text-black flex gap-1 items-center text-[1rem]">
    //       Search
    //       <input
    //         type="text"
    //         id="email"
    //         onChange={(e) => setsearch(e.target.value)}
    //         className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         placeholder="filter by : First Name, Last Name. Email Address"
    //       />
    //     </div>
    //   </div>
      
    //   <div className="container overflow-y-auto p-2">
    //     <table className="w-[100%] text-black">
    //       <thead>
    //         <tr className="text-start text-[0.8rem] md:text-sm border border-gray-300">
    //           <th className="text-start text-[0.8rem] md:text-sm py-3 px-4">
    //             S/N
    //           </th>
    //           <th className="text-start text-[0.8rem] md:text-sm">Joined</th>
    //           <th className="text-start text-[0.8rem] md:text-sm">Product Name</th>
    //           <th className="text-start text-[0.8rem] md:text-sm hidden md:table-cell">
    //             amount
    //           </th>
    //           <th className="text-start text-[0.8rem] md:text-sm hidden md:table-cell">
    //             action
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {users.length === 0 ? (
    //           <tr>
    //             <td colSpan={7} className="">
    //               No users found.
    //             </td>
    //           </tr>
    //         ) : (
    //           users
    //             .filter((value) => {
    //               return (
    //                 value.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    //                 value.title.toLowerCase().includes(search.toLowerCase()) ||
    //                 value.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    //                 value.productName.toLowerCase().includes(search.toLowerCase())
    //               );
    //             })
    //             .map((user, i) => (
    //               <tr key={i + 1} className="border border-[#43424285]">
    //                 <td className="py-3 px-4 text-[0.8rem] md:text-sm">
    //                   {i + 1}
    //                 </td>
    //                 <td className="text-[0.8rem] md:text-sm">
    //                   {user.createdAt ? getTimeAgo(user.createdAt) : ""}
    //                 </td>
    //                 <td className="text-[0.8rem] md:text-sm">{user.title}</td>
    //                 <td className="hidden md:table-cell text-[0.8rem] md:text-sm">
    //                   {user.amount}
    //                 </td>
    //                 <td
    //                   className="hidden md:table-cell text-[0.8rem] md:text-sm cursor-pointer" 
    //                   onClick={() => deleteProduct(user.id)}
    //                 >
    //                   Delete
    //                 </td>
    //               </tr>
    //             ))
    //         )}
    //         {isLoading && (
    //           <tr>
    //             <td colSpan={7} className="text-center">
    //               Loading...
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default ProductList;
