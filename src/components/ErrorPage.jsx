import React from "react";
import "../style/ErrorPage.css"; // Import the CSS file
import Layout from "./common/Layout";

const ErrorPage = () => {
  return (
    <Layout>
      <div className="error-container">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
      </div>
    </Layout>
  );
};

export default ErrorPage;
