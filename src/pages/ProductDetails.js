import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, image, category, title, price } = product;

  return (
    <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition rounded">
      {/* Image container */}
      <div className="w-full h-full flex justify-center items-center p-4">
        <img
          className="max-h-[160px] group-hover:scale-110 transition duration-300"
          src={image}
          alt={title}
        />
      </div>

      {/* Action Buttons */}
      <div className="absolute top-6 -right-11 group-hover:right-5 bg-red-500/40 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded">
        <button onClick={() => addToCart(product, id)}>
          <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500 hover:bg-red-600 transition rounded">
            <BsPlus className="text-3xl" />
          </div>
        </button>

        <Link
          to={`/products/${id}`}
          className="w-12 h-12 bg-white flex justify-center items-center text-primary shadow-md hover:shadow-lg transition rounded"
        >
          <BsEyeFill className="text-xl" />
        </Link>
      </div>

      {/* Product Info */}
      <div className="px-4 pb-4">
        <p className="text-sm capitalize text-gray-500 mb-1">{category}</p>
        <h2 className="font-semibold mb-1 truncate">{title}</h2>
        <p className="font-semibold text-primary">${price}</p>
      </div>
    </div>
  );
};

export default Product;
