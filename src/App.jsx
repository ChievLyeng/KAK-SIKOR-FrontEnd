import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { PersistGate } from "redux-persist/integration/react";
import { persistor,store} from "././store/index";


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
        </Routes>
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
