import { useEffect, useState } from "react";
import Footer from "../comp/Footer";
import Navbar from "../comp/Navbar";
import { useParams } from "react-router-dom";
import { Product } from "../Services/interface";
import { getProductByID } from "../Services/GetUser.service";
import ProductCheckout from "../comp/ProductCheckOut";

function ProductCart() {
  const id = useParams().id;
  const [pro, setprod] = useState<Product>();
  const getProduct = async () => {
    
    await getProductByID(id, (result: Product[]) => {
      const product = result[0];
      if(!product){
        return(<>No product found</>)
      }
      setprod(product)
     
    });
  };

  //console.log(pro)
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      {!pro && <div className="h-[100vh] flex justify-center items-center text-black">Please Wait .....</div>}
      {pro && 
      <>
      <Navbar />
        <ProductCheckout product={pro}/>
 
      <Footer />
      </>
      }
    </div>
  );
}

export default ProductCart;