import TopAppBar from "../../components/TopAppBar";
import UsersTable from "../../components/UsersTable";
import Container from "@mui/material/Container";

const UsersList = () => {
  return (
    <>
      <Container maxWidth="Lg" >
        <TopAppBar />
        <UsersTable />
      </Container>
    </>
  );
};

export default UsersList;
