import React, { useState, useEffect } from "react";
import { Product } from "../Services/interface";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "./Model";
import { database } from "../firebase";
import { toast } from "react-toastify";
import moment from "moment";

interface UserProps {
  log?: Product[];
}
const ProductLog: React.FC<UserProps> = ({ log = [] }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedLogs, setPaginatedLogs] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredLogs, setFilteredLogs] = useState<Product[]>(log);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const filtered = log.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLogs(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, log]);

  useEffect(() => {
    paginateLogs(currentPage);
  }, [filteredLogs, currentPage]);

  const paginateLogs = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedLogs(filteredLogs.slice(startIndex, endIndex));
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, productId: string) => {
    const newStatus = e.target.value;
    try {
      const productRef = doc(database, "products", productId);
      await updateDoc(productRef, { status: newStatus });
      toast.success("Product status updated successfully");
      if (selectedProduct) {
        setSelectedProduct({ ...selectedProduct, status: newStatus });
        const updatedLogs = filteredLogs.map((product) =>
          product.id === productId ? { ...product, status: newStatus } : product
        );
        setFilteredLogs(updatedLogs);
      }
    } catch (error) {
      toast.error("Failed to update product status");
    }
  };

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 mb-4 w-full mt-3"
      />
      
      <div className="relative overflow-x-auto w-full mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-3 text-left">ID</th>
              <th scope="col" className="py-3 px-3 text-left">Created</th>
              <th scope="col" className="py-3 px-3 text-left">Name</th>
              <th scope="col" className="py-3 px-3 text-left">Category</th>
              <th scope="col" className="py-3 px-3 text-left">Stock</th>
              <th scope="col" className="py-3 px-3 text-left">Sold</th>
              <th scope="col" className="py-3 px-3 text-left">Price</th>
              <th scope="col" className="py-3 px-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-3 px-3">
                  No logs available.
                </td>
              </tr>
            ) : (
              paginatedLogs.map((product, index) => (
                <tr key={product.id} className="border border-[#43424285]">
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">{index + 1}</td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    {moment(product.createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">{product.productName}</td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">{product.category}</td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">{product.status}</td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">{product.numberSold}</td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">{product.salesPrice}</td>
                  <td className="py-3 px-3 text-[0.8rem] md:text-sm text-left">
                    <button
                      onClick={() => handleViewProduct(product)}
                      className="text-black border border-black px-4 py-2 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedProduct && (
        <Modal onClose={handleCloseModal}>
          <div className="p-4">
            <h2 className="text-center text-[1.5rem] font-extrabold">Product Information</h2>
            <h2 className=" font-semibold mb-4">{selectedProduct.productName}</h2>
            <p className="mb-4">{selectedProduct.productDescription}</p>
            <img src={selectedProduct.productThumbnail} alt="Thumbnail" className="mb-4" />
            <div className="flex flex-wrap gap-4">
              {selectedProduct.productImages?.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index}`} className="w-20 h-20 rounded" />
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="status" className="block mb-2 text-sm font-medium">
                Status:
              </label>
              <select
                id="status"
                value={selectedProduct.status}
                onChange={(e) => handleStatusChange(e, selectedProduct.id)}
                className="border rounded p-2 w-full"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductLog;
