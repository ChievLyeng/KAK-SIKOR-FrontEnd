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
import HomePage from "./client-pages/Home/HomePage";
import ProductPage from "./client-pages/Products/ProductPage";
import CartPage from "./client-pages/Cart/CartPage";
import ShippingPage from "./client-pages/Shipping/ShippingPage";
import PaymentPage from "./client-pages/Payment/PaymentPage";
import PlaceOrderPage from "./client-pages/PlaceOrder/PlaceOrderPage";
import OrderPage from "./client-pages/Order/OrderPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "././store/index";
import clientStore from "./store/storeRtk";
import UserLogin from "./client-pages/Auth/UserLogin";
import UserProfile from "./client-pages/Auth/UserProfile";
import SupplierRegister from "./client-pages/Auth/SupplierRegister";
import ForgotPassword from "./client-pages/Auth/ForgotPassword";
import Verification from "./client-pages/Auth/VerifyOTP";
import ResetPassword from "./client-pages/Auth/ResetNewPassword";
import UserRegister from "./client-pages/Auth/UserRegister";
import ErrorPage from "./components/ErrorPage";
import CategoryPage from "./client-pages/productList/CategoryPage";
import ClientCreateProduct from "./client-pages/productList/ClientCreateProduct";

//const isAdminRoute = window.location.pathname.startsWith("/dashboard");

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PayPalScriptProvider deferLoading={true}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
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
              <Route path="/userlogin" element={<UserLogin />} />
              <Route path="/supplier-register" element={<SupplierRegister />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route
                path="/client-upload/:id"
                element={<ClientCreateProduct />}
              />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
