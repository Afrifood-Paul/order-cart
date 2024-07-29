import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

const ProductTitle = ({ singleProductTitle }) => {
  const { handleAddToCart, cartItems } = useContext(ShoppingCartContext);
  console.log(cartItems, Array.isArray(cartItems));

  const navigate = useNavigate();

  function handleNavigateDetalsPage(getCurrentIdDetails) {
    navigate(`/product-details/${getCurrentIdDetails}`);
  }

  return (
    <div className="relative group border-4 border-white p-6 cursor-pointer ">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={singleProductTitle.thumbnail}
          alt={singleProductTitle.title}
          className="object-cover w-full h-full md:bg-red-800 py-6 px-4 rounded-2xl bg-[whitesmoke] transition-all duration-300 group-hover:scale-125"
        />
      </div>

      <div className="flex md:flex-row items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-red-700 sm:text-sm md:text-lg">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {singleProductTitle.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-red-700 sm:text-sm md:text-[14px]">
            ${singleProductTitle.price}
          </p>
        </div>
      </div>
      <button
        onClick={() => handleNavigateDetalsPage(singleProductTitle.id)}
        className="px-5 mt-5 w-full py-2 bg-red-950 hover:bg-red-800 duration-500 rounded-lg text-white font-bold text-lg"
      >
       View Details
      </button>
      <button
        disabled={
          cartItems &&
          cartItems.findIndex((item) => item.id === singleProductTitle.id) > -1
        }
        onClick={() => handleAddToCart(singleProductTitle)}
        className="disabled:opacity-65 px-5 mt-5 w-full py-2 rounded-lg duration-500 bg-red-800 hover:bg-red-950  text-white font-bold text-lg"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductTitle;
