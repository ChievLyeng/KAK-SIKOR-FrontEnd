import SummaryData from "../../components/SummaryData";
import OrderTable from "../../components/OrderTable";
import Container from "@mui/material/Container";
import Layout from "../../components/common/Layout";


const Dashboard = () => {
  return (
    <Layout>
      <Container maxWidth="xl" className="dashboard-container">
        <SummaryData />
        <OrderTable />
      </Container>
    </Layout>
  );
};

export default Dashboard;
