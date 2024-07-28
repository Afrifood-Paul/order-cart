// create the context
//provide the state to the context
//wrap context in root component
//consume the context using useContext hook

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchProductList() {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();
    // console.log(result);

    if (result && result?.products) {
      setProductList(result?.products);
      setLoading(false);
    } else {
      null;
    }
  }

  useEffect(() => {
    fetchProductList();
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  // console.log(cartItems);

  function handleAddToCart(getProductDetails) {
    // console.log(getProductDetails);
  //   console.log('Product Details:', getProductDetails);
  // console.log('Current cartItems:', cartItems, Array.isArray(cartItems));

    //To Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      console.log("cartItems is not an array");
      return;
    };

    // console.log(cartItems);

    const cpyExistingCartItems = [...cartItems];

    const findIndexOfCurrentItem = cpyExistingCartItems.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );

    // console.log(findIndexOfCurrentItem);
    if (findIndexOfCurrentItem === -1) {
      cpyExistingCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails.price,
      });
    } else {
      // console.log("it is coming again");
      cpyExistingCartItems[findIndexOfCurrentItem] = {
        ...cpyExistingCartItems[findIndexOfCurrentItem],
        quantity: cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1) *
          cpyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }
    // console.log(cpyExistingCartItems, "cpyExistingCartItems");
    setCartItems(cpyExistingCartItems);
  
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    navigate("/cart");
  };

  function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
    // Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      console.log("cartItems is not an array");
      return;
    }

    const cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingCartItems.findIndex(
      (item) => item.id === getProductDetails.id
    );

    if (isFullyRemoveFromCart) {
      cpyExistingCartItems.splice(findIndexOfCurrentItem, 1);
    } else {
      cpyExistingCartItems[findIndexOfCurrentItem] = {
        ...cpyExistingCartItems[findIndexOfCurrentItem],
        quantity: cpyExistingCartItems[findIndexOfCurrentItem].quantity - 1,
        totalPrice:
          (cpyExistingCartItems[findIndexOfCurrentItem].quantity - 1) *
          cpyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }

    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    setCartItems(cpyExistingCartItems);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        productList,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        handleAddToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
