import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import ProductList from "./pages/ProductList/ProductList";
import UsersList from "./pages/UsersList/UsersList";
import CreateProduct from "./pages/ProductList/CreateProduct";
import ReviewList from "./pages/ReviewList/ReviewList";
import Dashboard from "./pages/Dashboard/Dashboard";
import SupplierDetail from "./pages/UsersList/SupplierDetail";
import UpdateProduct from "./pages/ProductList/UpdateProduct";
import MyAccount from "./pages/MyAccount/MyAccount";
import Login from "./pages/Auth/Login";
import ProductDetail from "./pages/ProductList/ProductDetail";
import HomePage from "./components/HomePage";
import ProductPage from "./pages/Products/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import ShippingPage from "./pages/Shipping/ShippingPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrder/PlaceOrderPage";
import OrderPage from "./pages/Order/OrderPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "././store/index";
import clientStore from "./store/storeRtk";
import UserLogin from "./pages/Auth/UserLogin";
import ProfileScreen from "./pages/Auth/UserProfile";
import RegisterScreen from "./pages/Auth/UserRegister";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Verification from "./pages/Auth/VerificationScreen";
import ResetPassword from "./pages/Auth/ResetNewPassowrd";

const isAdminRoute = window.location.pathname.startsWith("/dashboard");
function App() {
  return (
    <Provider store={isAdminRoute ? store : clientStore}>
      <PersistGate loading={null} persistor={persistor}>
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
              <Route path="/login" element={<UserLogin />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
            </Routes>
          </Router>
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
