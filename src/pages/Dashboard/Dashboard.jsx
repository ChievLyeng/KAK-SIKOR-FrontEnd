import SummaryData from "../../components/summaryData";
import OrderTable from "../../components/OrderTable";
import Container from '@mui/material/Container';

const Dashboard = () => {
    return (
        

        <div className='container-all'>
            <Container maxWidth="Lg" className="MuiContainer-maxWidthMd" >

                <SummaryData />

                <OrderTable />

            </Container>
        </div>

    );
}

export default Dashboard;