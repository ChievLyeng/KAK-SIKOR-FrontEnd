import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "././store/index";
import HomePage from "./client-pages/Home/HomePage";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
