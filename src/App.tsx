import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductUploadForm from "./pages/Dashboard";
import Dashboard from "./pages/MainDasboard";
import ViewProduct from "./comp/ViewProduct";
import ProductDetail from "./pages/ProductDetails";
import WhoWeAre from "./pages/WhoWeAre";
import ContactUS from "./pages/ContactUS";
import UserRegistration from "./pages/UserRegistration";
import UserLogPage from "./pages/UserLogPage";
import TransactionPage from "./pages/Transaction";
import Transfer from "./pages/Transfer.tsx";
import Logtransfer from "./pages/Logtransfer";
import Support from "./pages/Support";
import AdminCreateNewuser from "./pages/AdminUserCreation";
import CreateProduct from "./pages/CreateProduct";
import { CartProvider } from "./Services/CartContext";
import CartPage from "./pages/CartPage";
import ProductCart from "./pages/ViewProduct";
import ContactSupport from "./pages/ContactSupport";

function App() {
  return (
    <>
    <CartProvider>

  
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
           <Route path="/register" element={<UserRegistration />} />
          <Route path="/auth/dashboard" element={<Dashboard />} />
          <Route path="/auth/User" element={<UserLogPage />} />
          <Route path="/auth/product/dashboard" element={<TransactionPage />} />
          <Route path="/auth/create-new-Product/dashboard" element={<CreateProduct />} />
          <Route path="/auth/create-new-account/dashboard" element={<AdminCreateNewuser />} />
          <Route path="/auth/account-support/dashboard" element={<Support />} />
          <Route path="/store" element={<Logtransfer />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/Contact-us" element={<ContactUS />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/brands/checkout/:id" element={<ProductCart />} />
          <Route path="/auth/support" element={<ContactSupport />} />
   
{/*          
          <Route path="/auth/withdrawal-request/dashboard" element={<LoanPage />} />
          <Route path="/fund-request-history/:token" element={<AccountFundLog />} />
          <Route path="/withdrawal-request-history/:token" element={<LoanLog />} />
          <Route path="/auth/fund-account/dashboard" element={<FundAccount />} />
         
          <Route path="/auth/account-setting/dashboard" element={<AccountSettingsPage />} />
          
          <Route path="/upload/admin" element={<ProductUploadForm />} />
          <Route path="/upload/product" element={<ViewProduct />} />
          <Route path="/products/:productName" element={<ProductDetail />} /> */}
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
