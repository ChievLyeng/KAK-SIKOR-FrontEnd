import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import ProductList from "./admin-pages/ProductList/ProductList";
import UsersList from "./admin-pages/UsersList/UsersList";
import CreateProduct from "./admin-pages/ProductList/CreateProduct";
import ReviewList from "./admin-pages/ReviewList/ReviewList";
import Dashboard from "./admin-pages/Dashboard/Dashboard";
import SupplierDetail from "./admin-pages/UsersList/SupplierDetail";
import UpdateProduct from "./admin-pages/ProductList/UpdateProduct";
import MyAccount from "./admin-pages/MyAccount/MyAccount";
import Login from "./admin-pages/Auth/Login";
import ProductDetail from "./admin-pages/ProductList/ProductDetail";
<<<<<<< HEAD
import HomePage from "./components/HomePage";
import ProductPage from "./client-pages/Products/ProductPage";
import CartPage from "./client-pages/Cart/CartPage";
import ShippingPage from "./client-pages/Shipping/ShippingPage";
import PaymentPage from "./client-pages/Payment/PaymentPage";
import PlaceOrderPage from "./client-pages/PlaceOrder/PlaceOrderPage";
import OrderPage from "./client-pages/Order/OrderPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "././store/index";
import clientStore from "./store/storeRtk";

const isAdminRoute = window.location.pathname.startsWith("/dashboard");
=======
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "././store/index";
import HomePage from "./client-pages/Home/HomePage";
>>>>>>> develop

function App() {
  return (
    <Provider store={isAdminRoute ? store : clientStore}>
      <PersistGate loading={null} persistor={persistor}>
<<<<<<< HEAD
        <PayPalScriptProvider deferLoading={true}>
          <Router>
            <Routes>
              <Route path="/loginAdmin" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="/productsList" element={<ProductList />} />
              <Route path="/usersList" element={<UsersList />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path={`/supplier/:id`} element={<SupplierDetail />} />
              <Route path="/review-list" element={<ReviewList />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="shipping" element={<ShippingPage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
            </Routes>
          </Router>
        </PayPalScriptProvider>
=======
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/productsList" element={<ProductList />} />
            <Route path="/usersList" element={<UsersList />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path={`/supplier/:id`} element={<SupplierDetail />} />
            <Route path="/review-list" element={<ReviewList />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/home-page" element={<HomePage />} />
          </Routes>
        </Router>
>>>>>>> develop
      </PersistGate>
    </Provider>
  );
}

export default App;
