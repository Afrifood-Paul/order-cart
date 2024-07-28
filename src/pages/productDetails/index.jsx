import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    productDetails,
    setProductDetails,
    setLoading,
    loading,
    handleAddToCart,
    cartItems,
  } = useContext(ShoppingCartContext);

  async function fetchProductDetails() {
    setLoading(true);
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();
    // console.log(result);

    if (result) {
      setProductDetails(result);
      setLoading(false);
    } else {
      <p>error in fetching the item details</p>;
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  //navigate to cart
  // function handleNavigateToCart() {
  //    navigate("/cart")
  // };

  // console.log(productDetails);

  if (loading) {
    return (
      <p className="text-2xl lg:text-3xl text-center w-full lg:w-[50%] mx-auto mt-32 text-red-700 bg-black p-20">
        Product details loading, please wait.....
      </p>
    );
  }

  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-5 g:mx-auto bg-red-700 my-10 rounded-xl">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-2xl bg-[whitesmoke] shadow-lg shadow-black">
              <img
                className="w-1/2 rounded object-cover"
                src={productDetails.thumbnail}
                alt={productDetails.title}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {productDetails?.images
                ? productDetails.images.map((imageItem) => (
                    <div className="rounded-xl p-4 shadow-md " key={imageItem}>
                      <img
                        src={imageItem}
                        className="w-24 cursor-pointer"
                        alt="product second image"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[whitesmoke]">
              {productDetails.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-xl font-bold text-[whitesmoke]">
                ${productDetails?.price}
              </p>
            </div>
            <div>
              {cartItems &&
              cartItems.findIndex((item) => item.id === productDetails.id) >
                -1 ? (
                <p className="py-2 text-[whitesmoke] font-light">
                  Item Is Already Added
                </p>
              ) : null}
              <button
                disabled={
                  cartItems &&
                  cartItems.findIndex((item) => item.id === productDetails.id) >
                    -1
                }
                onClick={() => handleAddToCart(productDetails)}
                className="disabled:opacity-65 min-w-[200px] mt-5 px-4 py-3 border border-[#333] mx-2 bg-white text-sm font-semibold rounded duration-500 hover:bg-slate-900 hover:text-white"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate("/product-list")}
                className="min-w-[200px] mt-5 px-4 py-3 border border-[#333] bg-white text-sm font-semibold rounded duration-500 hover:bg-slate-900 hover:text-white"
              >
                BackToProductList
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
