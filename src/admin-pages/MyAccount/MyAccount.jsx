import Container from "@mui/material/Container";
import AccountInformation from "../../components/AccountInformation";
<<<<<<< HEAD
import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
=======
import Header from "../../components/common/Header.jsx";
import Layout from "../../components/common/Layout.jsx";
>>>>>>> develop

const MyAccount = () => {
  return (
    <Layout>
      <Container maxWidth="xl" className="user-profile-container">
        <Header title="My Account" />
        <AccountInformation />
      </Container>
    </Layout>
  );
};

export default MyAccount;
