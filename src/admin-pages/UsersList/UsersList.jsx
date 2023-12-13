import UsersTable from "../../components/UsersTable";
import Container from "@mui/material/Container";
import Layout from "../../components/common/Layout";

const UsersList = () => {
  return (
    <Layout>
      <Container maxWidth="Lg">
        <UsersTable />
      </Container>
    </Layout>
  );
};

export default UsersList;
