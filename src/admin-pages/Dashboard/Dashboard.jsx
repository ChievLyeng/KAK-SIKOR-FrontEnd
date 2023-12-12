import SummaryData from "../../components/SummaryData";
import OrderTable from "../../components/OrderTable";
import Container from "@mui/material/Container";
import TopAppBar from "../../components/TopAppBar";

const Dashboard = () => {
  return (
    <>
      <Container maxWidth="xl" className="dashboard-container">
        <TopAppBar />
        <SummaryData />
        <OrderTable />
      </Container>
    </>
  );
};

export default Dashboard;
