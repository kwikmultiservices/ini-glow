import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'; // Import Firestore methods
import { auth, database } from '../firebase';
import { Product } from './interface';


interface CartContextType {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  number:number
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Determine login status (you can fetch from auth context or Firebase auth)
 // Replace with actual user ID from auth context if logged in
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    // Load cart items on mount from either local storage or Firestore
    if (isLoggedIn) {
      loadCartFromFirestore(userId as string);
    } else {
      const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(savedCart);
    }
  }, [isLoggedIn]);

  const loadCartFromFirestore = async (userId: string) => {
    const cartDocRef = doc(database, 'carts', userId);
    const cartDoc = await getDoc(cartDocRef);
    if (cartDoc.exists()) {
      setCartItems(cartDoc.data()?.items || []);
    } else {
      console.log('No Firestore cart found, starting with an empty cart.');
    }
  };

  const syncCartToFirestore = async (newCartItems: Product[]) => {
    if (isLoggedIn) {
      const cartDocRef = doc(database, 'carts', userId as string);
      await setDoc(cartDocRef, { items: newCartItems }, { merge: true });
    }
  };

  const syncCartToLocalStorage = (newCartItems: Product[]) => {
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const addToCart = (item: Product) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.find((i) => i.id === item.id)
        ? prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prevItems, { ...item, quantity: 1 }];
      
      // Sync to the appropriate storage
      if (isLoggedIn) {
        syncCartToFirestore(updatedCart);
      } else {
        syncCartToLocalStorage(updatedCart);
      }
      
      return updatedCart;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== itemId);
      
      if (isLoggedIn) {
        syncCartToFirestore(updatedCart);
      } else {
        syncCartToLocalStorage(updatedCart);
      }
      
      return updatedCart;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      
      if (isLoggedIn) {
        syncCartToFirestore(updatedCart);
      } else {
        syncCartToLocalStorage(updatedCart);
      }
      
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (isLoggedIn) {
      syncCartToFirestore([]);
    } else {
      localStorage.removeItem('cartItems');
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.salesPrice * item.quantity,
    0
  );


  const number = cartItems.length

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        number
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
