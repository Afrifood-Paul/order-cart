import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import cartIcon from "../../assets/cart-logo.webp";

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
    <Fragment>
      <div className="w-full h-[40vh] md:h-[30vh] lg:h-[40vh] bg-red-800">
        <h2 className="text-center text-3xl text-[whitesmoke] font-bold py-10">Speck Shopping Mall</h2>
        <div className="flex items-center justify-center">
          <button
            onClick={GoToProductListPage}
            className="text-gray-950 font-medium text-2xl bg-[whitesmoke] px-5 py-3 rounded-xl hover:bg-black hover:text-red-600 duration-700"
          >
           Get-Products
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-14 mx-5 md:mx-0">
        <img src={cartIcon} />
      </div>
    </Fragment>
  );
};

export default MainPage;
