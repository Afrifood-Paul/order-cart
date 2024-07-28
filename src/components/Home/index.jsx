import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

const MainPage = () => {
  const navigate = useNavigate();

  const { setLoading } = useContext(ShoppingCartContext);

  const GoToProductListPage = () => {
    setLoading(true);
    navigate("/product-list");

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className=" h-screen flex items-center justify-center bg-slate-900">
      <button
        onClick={GoToProductListPage}
        className="p-20 w-[90%] mx-auto lg:w-[50%] rounded-xl bg-black text-white font-bold text-lg"
      >
        Go To Product List Page
      </button>
    </div>
  );
};

export default MainPage;
