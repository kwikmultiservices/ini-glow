import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../Services/interface";
// Add your delete and update functions
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product }: { product: Product } = location.state;
  const [productData, setProductData] = useState<Product>(product);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateProduct(productData); // Implement this function in your service
      alert("Product updated successfully!");
      navigate("/upload/product");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productData.id); // Implement this function in your service
      alert("Product deleted successfully!");
      navigate("/upload/product");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

   const deleteProduct = async (id: string) => {
    try {
      const productRef = doc(database, "files", id); // Assuming your products are stored in a 'products' collection
      await deleteDoc(productRef);
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  // Update product in Firestore
const updateProduct = async (product: Product) => {
    try {
      const productRef = doc(database, "files", product.id); // Assuming each product's document ID is the product name
      await updateDoc(productRef, { ...product });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <></>
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold">Product Details</h1>
    //   <div className="mt-4">
    //     <label>Product Name:</label>
    //     <input
    //       type="text"
    //       name="productName"
    //       value={productData.productName}
    //       onChange={handleChange}
    //       className="border p-2 w-full"
    //     />
    //   </div>
    //   <div className="mt-4">
    //     <label>Owner Name:</label>
    //     <input
    //       type="text"
    //       name="ownerName"
    //       value={productData.ownerName}
    //       onChange={handleChange}
    //       className="border p-2 w-full"
    //     />
    //   </div>
    //   <div className="mt-4">
    //     <label>Amount:</label>
    //     <input
    //       type="text"
    //       name="amount"
    //       value={productData.amount}
    //       onChange={handleChange}
    //       className="border p-2 w-full"
    //     />
    //   </div>
    //   <div className="mt-4">
    //     <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
    //       Save Changes
    //     </button>
    //     <button
    //       onClick={() => setShowDeleteModal(true)}
    //       className="bg-red-500 text-white p-2 rounded ml-4"
    //     >
    //       Delete Product
    //     </button>
    //   </div>

    //   {showDeleteModal && (
    //     <div className="modal">
    //       <div className="modal-content">
    //         <p>Are you sure you want to delete this product?</p>
    //         <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
    //           Yes, Delete
    //         </button>
    //         <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white p-2 rounded">
    //           No, Cancel
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default ProductDetail;
