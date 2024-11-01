import { useNavigate } from "react-router-dom";
import Navbar from "../comp/Navbar";
import { useCart } from "../Services/CartContext";
import { Applicationdata } from "../Services/interface";
import { useEffect, useState } from "react";
import { getApplication } from "../Services/GetUser.service";
import { database } from "../firebase";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
  const navigate = useNavigate()
  const [Application, setapplication] = useState<Applicationdata>()
  const [loading, setloading] = useState(false)
  useEffect(() => {
     getApplication(null, (postData: any) => {
      setapplication(postData)
   
    });
  }, [])
  const handleRoutePayment = async () => {
    setloading(true)
    try {
      // Loop through each cart item to update `numberSold`
      for (const item of cartItems) {
        const productRef = doc(database, "products", item.id);
        await updateDoc(productRef, {
          numberSold: increment(1)
        });
      }

      // Check if company document exists
      const companyRef = doc(database, "company", "companyData");
      const companyDoc = await getDoc(companyRef);

      if (!companyDoc.exists()) {
        // Create company document if it doesn't exist
        await setDoc(companyRef, {
          totalSale: totalAmount,
          totalItemsSold: cartItems.length,
          income: totalAmount
        });
      } else {
        // Update existing company document
        await updateDoc(companyRef, {
          totalSale: increment(totalAmount),
          totalItemsSold: increment(cartItems.length),
          income: increment(totalAmount)
        });
      }

      window.localStorage.removeItem("cartItems")
      // Clear cart from local storage and navigate to payment link
      navigate(`${Application?.paymentLink}`);
    } catch (error) {
      setloading(false)
      console.error("Error processing payment:", error);
    }
  
  };

  return (
  <div className="">
    <Navbar/>
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Cart ({cartItems.length} items)</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row">
          {/* Left Section: Cart Items */}
          <div className="space-y-4 w-full lg:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-4" >
                  {/* Product Image */}
                  <div className="cursor-pointer" onClick={()=>navigate(`/product/brands/checkout/${item.id}`)}>
                  <img src={item.productThumbnail} alt={item.productName} className="w-32 h-32 object-cover" />
                  </div>
                  
                  {/* Product Info */}
                  <div>
                    <h3 className="font-semibold text-lg">{item.productName}</h3>
                    <p>Category: {item.category}</p>
                    <p>Product Code: {item.productCode}</p>
                  </div>
                </div>

                {/* Price and Quantity Control */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 0}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold">&#8358; {(item.salesPrice * item.quantity).toFixed(2)}</p>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section: Checkout Summary */}
          <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-md ml-0 lg:ml-6 mt-6 lg:mt-0">
            <h3 className="text-lg font-bold mb-4">The total amount of</h3>
            <div className="flex justify-between mb-2">
              <span>Amount</span>
              <span> &#8358; {totalAmount.toFixed(2)}</span>
            </div>

              <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span> &#8358; 0.00</span>
            </div>


            <div className="flex justify-between font-bold mb-6">
              <span>The total amount of (Including VAT)</span>
              <span> &#8358; {totalAmount.toFixed(2)}</span>
            </div>

            
            <button disabled={loading} onClick={handleRoutePayment} className="w-full bg-primary text-white py-2 rounded">{loading ? "Please Wait" : "Pay Now"}</button>

          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default CartPage;
