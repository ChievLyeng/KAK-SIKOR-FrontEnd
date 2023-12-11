import Container from "@mui/material/Container";
import TopAppBar from "../../components/TopAppBar";
import AccountInformation from "../../components/AccountInformation";
import Header from "../../common-component/Header";
import { useEffect, useState } from "react";


const MyAccount = () => {

  return (
    <>
      <Container maxWidth="xl" className="user-profile-container">
        <TopAppBar />
        <Header title="My Account" />
        <AccountInformation />
      </Container>
    </>
  );
};

export default MyAccount;
