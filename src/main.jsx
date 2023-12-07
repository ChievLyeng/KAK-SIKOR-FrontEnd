import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartScreen from "./pages/CartScreen";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index={true} element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartScreen />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
