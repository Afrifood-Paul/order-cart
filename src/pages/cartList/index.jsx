import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CartTile from "../../components/cattTile";

const CartListPage = () => {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <div className="mx-w 5xl mx-auto max-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-[whitesmoke] rounded-lg bg-red-800 lg:w-[50%] mx-3 lg:mx-auto p-10 md:mb-20 text-center">
        My Cart List Page
      </h1>
      <div className="grid lg:grid-cols-3 gap-8 mt-2">
        <div className="md:col-span-2 mx-6 space-y-4 mt-3">
          {cartItems?.length > 0 ? (
            cartItems.map((singleCartItem) => (
              <CartTile singleCartItem={singleCartItem} />
            ))
          ) : (
            <h1>No Items Available In Cart! Please Add Some Carts...</h1>
          )}
        </div>
        <div className="bg-gray-950 rounded-sm p-4 h-max mx-2">
          <h3 className="text-xl font-extrabold text-white border-b border-gray-300 pb-2">
            Order Summary
          </h3>
          <ul className="text-red-600 mt-4">
            <p className="flex flex-wrap gap-4 text-xl font-bold">
              Total{" "}
              <span>
                ${" "}
                {cartItems
                  .reduce((acc, curr) => acc + curr.totalPrice, 0)
                  .toFixed(2)}
              </span>
            </p>
          </ul>
          <div className="mt-5 flex  items-center gap-5">
            <button disabled={cartItems.length === 0} className=" disabled:opacity-60 disabled:bg-gray-600 text-lg px-4 py-3 bg-red-600 text-white font-extrabold">
              checkout
            </button>
            <button
              onClick={() => navigate("/product-list")}
              className="text-lg px-4 py-3 bg-red-900 text-white font-extrabold"
            >
              continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartListPage;
