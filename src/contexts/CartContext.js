import React, { createContext, useEffect, useState } from 'react';

// Create context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //Item Amount State
  const [itemAmount,setItemAmount]= useState(0)


  
//update item amount effect 
useEffect (() => {
if (cart) {
  const amount = cart.reduce((accumulator,currentItem)=>
    {
 return accumulator + currentItem.amount;
},0); 
setItemAmount(amount)
}
},[cart]);


  // Add to cart
  const addToCart = (product) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  // Increase item quantity
  const increaseAmount = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease item quantity
  const decreaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem && cartItem.amount > 1) {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      );
      setCart(updatedCart);
    } else {
      // If quantity is 1, remove the item
      removeFromCart(id);
    }
  };
  // Clear cart
const clearCart = () => {
  setCart([]);
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart , increaseAmount,
        decreaseAmount,clearCart,itemAmount}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
