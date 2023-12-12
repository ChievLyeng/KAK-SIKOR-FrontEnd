import Container from "@mui/material/Container";
import TopAppBar from "../../components/TopAppBar";
import AccountInformation from "../../components/AccountInformation";
import Header from "../../components/common/Header.jsx";

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
