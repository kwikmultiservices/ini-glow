
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Services/CartContext';
import { FiShoppingCart } from "react-icons/fi";
const CartIcon = () => {
  const { number } = useCart();
  const navigate = useNavigate();


  return (
    <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
     <div className="text-[2rem]">
     <FiShoppingCart />
     </div>
      {number > 0 ? (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
          {number}
        </span>
      ) : (
        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
      )}
    </div>
  );
};

export default CartIcon;
