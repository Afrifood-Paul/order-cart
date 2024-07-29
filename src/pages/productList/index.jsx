import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTitle from "../../components/ProductTitle";

const ProductListPage = () => {
  const { productList, loading } = useContext(ShoppingCartContext);

  // console.log(productList);

  if (loading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl lg:text-3xl text-center font-medium text-[whitesmoke] bg-red-800 p-24">
          Please Wait.... Loading Products.
        </h2>
      </div>
    );
  } else {
    <p>No data found</p>;
  }

  return (
    <section className="bg-white">
      <div className="w-full h-[30vh] bg-red-800">
        <div className="max-w-md mx-auto text-center py-20">
          <h2 className="text-4xl font-extrabold  text-white">
            Our Features Products
          </h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((singleProductTitle) => (
            <ProductTitle singleProductTitle={singleProductTitle} />
          ))
        ) : (
          <h2 className="text-white font-bold">No Products Found </h2>
        )}
      </div>
    </section>
  );
};

export default ProductListPage;
