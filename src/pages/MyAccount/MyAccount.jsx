import Container from "@mui/material/Container";
import TopAppBar from "../../components/TopAppBar";
import AccountInformation from "../../components/AccountInformation";


const MyAccount = () => {
  return (
    <>
      <Container maxWidth="xl" className="MuiContainer-maxWidthMd">
        <TopAppBar />
        <AccountInformation />
      </Container>
    </>
  );
};

export default MyAccount;
