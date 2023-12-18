import OrderTable from "../../components/OrderTable";
import Container from "@mui/material/Container";
import SummaryOrderStatus from "../../components/SummayOrderStatus";
import Layout from "../../components/common/Layout";


const AdminOrder = () => {
  return (
    <Layout>
      <Container maxWidth="xl" className="dashboard-container">
        <SummaryOrderStatus />
        <OrderTable />
      </Container>
    </Layout>
  );
};

export default AdminOrder;