import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import CartListPage from "./pages/cartList";
import ProductListPage from "./pages/productList";
import ProductDetailsPage from "./pages/productDetails";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MainPage from "./components/Home";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="cart" element={<CartListPage />} />
        <Route path="product-list" element={<ProductListPage />} />
        <Route path="product-details/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
