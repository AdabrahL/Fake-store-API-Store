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
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      {/* Header */}
      <div style={{marginBottom:'-30px'}} className="flex items-center justify-between py-6 border-b">
        <h2 className="uppercase text-sm font-semibold">
          Shopping Bag ({totalItems})
        </h2>
        <button onClick={handleClose} className="w-8 h-8 flex justify-center items-center">
          <IoMdArrowForward className="text-2xl" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto border-b">
        {cart.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="uppercase font-semibold">Total:</span>
          <span className="font-semibold text-primary">${totalPrice}</span>
        </div>

        <button
          onClick={clearCart}
          className="w-12 h-12 bg-red-500 text-white flex justify-center items-center text-xl hover:bg-red-600 transition"
        >
          <FiTrash2 />
        </button>

        <Link
          to="/checkout"
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
