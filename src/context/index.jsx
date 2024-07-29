import React, { createContext, useEffect, useState } from "react";
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
    // console.log("Fetched product list:", result);

    if (result && result.products) {
      setProductList(result.products);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductList();

    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const parsedCartItems = JSON.parse(storedCartItems);
        // console.log(
        //   "Parsed cartItems from localStorage:",
        //   parsedCartItems,
        //   Array.isArray(parsedCartItems)
        // );
        setCartItems(parsedCartItems);
      } catch (error) {
        console.error("Error parsing cartItems from localStorage:", error);
      }
    }
  }, []);

  function handleAddToCart(getProductDetails) {
    // console.log("Product Details:", getProductDetails);
    // console.log("Current cartItems:", cartItems, Array.isArray(cartItems));

    if (!Array.isArray(cartItems)) {
      console.error("cartItems is not an array", typeof cartItems);
      return;
    }

    const cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingCartItems.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );

    if (findIndexOfCurrentItem === -1) {
      cpyExistingCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails.price,
      });
    } else {
      cpyExistingCartItems[findIndexOfCurrentItem] = {
        ...cpyExistingCartItems[findIndexOfCurrentItem],
        quantity: cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (cpyExistingCartItems[findIndexOfCurrentItem].quantity + 1) *
          cpyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }

    // console.log(
    //   "Updated cartItems:",
    //   cpyExistingCartItems,
    //   Array.isArray(cpyExistingCartItems)
    // );
    setCartItems(cpyExistingCartItems);

    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    // console.log(
    //   "Saved cartItems to localStorage:",
    //   localStorage.getItem("cartItems")
    // );
    // navigate("/cart");
  }

  function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
    if (!Array.isArray(cartItems)) {
      console.error("cartItems is not an array", typeof cartItems);
      return;
    }

    const cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = cpyExistingCartItems.findIndex(
      (item) => item.id === getProductDetails.id
    );

    // if (isFullyRemoveFromCart) {
    //   cpyExistingCartItems.splice(findIndexOfCurrentItem, 1);
    // } else {
    //   cpyExistingCartItems[findIndexOfCurrentItem] = {
    //     ...cpyExistingCartItems[findIndexOfCurrentItem],
    //     quantity: cpyExistingCartItems[findIndexOfCurrentItem].quantity - 1,
    //     totalPrice:
    //       (cpyExistingCartItems[findIndexOfCurrentItem].quantity - 1) *
    //       cpyExistingCartItems[findIndexOfCurrentItem].price,
    //   };

    if (isFullyRemoveFromCart) {
      // Remove the item from the cart
      cpyExistingCartItems.splice(findIndexOfCurrentItem, 1);
    } else {
      // Update the quantity and total price of the item
      const currentItem = cpyExistingCartItems[findIndexOfCurrentItem];
      const newQuantity = currentItem.quantity - 1;
      const newQuantityStopDecrease = currentItem.quantity;

      if (newQuantity > 0) {
        cpyExistingCartItems[findIndexOfCurrentItem] = {
          ...currentItem,
          quantity: newQuantity,
          totalPrice: newQuantity * currentItem.price,
        };
      } else {
        // If the new quantity is zero, stop decreasing the item from the cart
        newQuantityStopDecrease;
      }
    }

    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    setCartItems(cpyExistingCartItems);
    // console.log(
    //   "Updated cartItems after removal:",
    //   cpyExistingCartItems,
    //   Array.isArray(cpyExistingCartItems)
    // );
  }

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
