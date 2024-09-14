import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    const storedQuantities = JSON.parse(localStorage.getItem('quantities')) || {};
    setQuantity(storedQuantities);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('quantities', JSON.stringify(quantity));
  }, [cartItems, quantity]);

  const handleDecrease = (item) => {
    setQuantity(prevQuantity => {
      const newQuantity = { ...prevQuantity, [item._id]: (prevQuantity[item._id] || 1) - 1 };
      if (newQuantity[item._id] <= 0) {
        handleRemove(item);
      }
      return newQuantity;
    });
  };

  const handleIncrease = (item) => {
    setQuantity(prevQuantity => ({ ...prevQuantity, [item._id]: (prevQuantity[item._id] || 1) + 1 }));
  };

  const handleRemove = (item) => {
    setCartItems(prevCartItems => prevCartItems.filter(cartItem => cartItem._id !== item._id));
    setQuantity(prevQuantity => {
      const newQuantity = { ...prevQuantity };
      delete newQuantity[item._id];
      return newQuantity;
    });
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.afterdiscount * (quantity[item._id] || 1)), 0);

  return (
    <CartContext.Provider value={{ cartItems, quantity, handleDecrease, handleIncrease, handleRemove, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
