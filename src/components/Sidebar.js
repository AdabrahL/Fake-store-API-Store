import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import CartItem from '../components/CartItem';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.amount, 0)
    .toFixed(2);

  return (
    <div
      className={`${
        isOpen ? 'right-0' : '-right-full'
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] 
      transition-all duration-300 z-20 px-4 lg:px-[35px] flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-6 border-b">
        <h2 className="uppercase text-sm font-semibold">
          Shopping Bag ({totalItems})
        </h2>
        <button onClick={handleClose} className="w-8 h-8 flex justify-center items-center">
          <IoMdArrowForward className="text-2xl" />
        </button>
      </div>

      {/* Cart Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto border-b mt-2 mb-4">
        {cart.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Footer (Fixed) */}
      <div className="sticky bottom-0 bg-white z-10 pt-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="uppercase font-semibold">Total:</span>
          <span className="font-semibold text-primary">${totalPrice}</span>
        <button
            onClick={clearCart}
            className="w-12 h-12 bg-red-500 text-white flex justify-center items-center text-xl hover:bg-red-600 transition"
          >
            <FiTrash2 />
          </button>
       
        </div>

        <div className="flex justify-between items-center mb-3">
         
          <Link to="/" 
          className="bg-gray-200 flex p-4 justify-center 
          items-center text-primary w-full font-medium">
            View Cart
          </Link>
        </div>

        <Link
          to="/checkout"
         className="bg-primary flex p-4 justify-center 
          items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
