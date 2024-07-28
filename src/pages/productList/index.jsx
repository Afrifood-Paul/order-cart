import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTitle from "../../components/ProductTitle";

const ProductListPage = () => {
  const { productList, loading } = useContext(ShoppingCartContext);

  // console.log(productList);

  if (loading) {
    return (
      <h2 className="text-3xl text-center text-red-700 bg-black p-20">
        please wait.... fetching data from the endpoint.
      </h2>
    );
  } else {
    <p>No data found</p>;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-red-700">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extrabold  text-white">
            Our Features Products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {productList && productList.length > 0 ? (
            productList.map((singleProductTitle) => (
              <ProductTitle singleProductTitle={singleProductTitle} />
            ))
          ) : (
            <h2 className="text-white font-bold">No Products Found </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
