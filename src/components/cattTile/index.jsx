import React, { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";

const CartTile = ({ singleCartItem }) => {
  const { handleRemoveFromCart, handleAddToCart } = useContext(ShoppingCartContext);

  //   console.log(singleCartItem);
  return (
    <Fragment>
      <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 rounded-sm">
            <img
              src={singleCartItem?.thumbnail}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {singleCartItem.title}
            </h3>
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, true)}
              className="text-lg px-4 py-3 bg-red-600 hover:bg-red-900 duration-500 text-white font-extrabold"
            >
              REMOVE
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem.totalPrice.toFixed(2)}
          </h3>
          <p className="mt-2 mb-3 font-bold text-[16px]">Quantity: {singleCartItem.quantity}</p>
          <div className="mt-3 space-x-2">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              className="border border-[#000] px-2 font-bold hover:bg-black hover:text-white"
            >
              -
            </button>
            <button onClick={() => handleAddToCart(singleCartItem)} className="border border-[#000] font-bold px-2 hover:bg-black hover:text-white">
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="border border-gray-500" />
    </Fragment>
  );
};

export default CartTile;
