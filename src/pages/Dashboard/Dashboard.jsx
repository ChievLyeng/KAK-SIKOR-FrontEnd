import SummaryData from "../../components/summaryData";
import OrderTable from "../../components/OrderTable";
import Container from "@mui/material/Container";
import TopAppBar from "../../components/TopAppBar";

const Dashboard = () => {
  return (
    <>
      <Container maxWidth="xl" className="MuiContainer-maxWidthMd">
        <TopAppBar />
        <SummaryData />
        <OrderTable />
      </Container>
    </>
  );
};

export default Dashboard;
