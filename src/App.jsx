import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import UsersList from "./pages/UsersList/UsersList";
import CreateProduct from "./pages/ProductList/CreateProduct";
import ReviewList from "./pages/ReviewList/ReviewList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/productsList" element={<ProductList />} />
        <Route path="/usersList" element={<UsersList />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/review-list" element={<ReviewList />} />
      </Routes>
    </Router>
  );
}

export default App;
