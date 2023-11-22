import Header from "../../common-component/Header";
import TopAppBar from "../../components/TopAppBar";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSupplierById } from "../../store";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OutlinedCard from "../../common-component/OutlineCard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import '../../style/SupplierDetail.css'

function SupplierDetail() {
  const dispatch = useDispatch();
  const params = useParams();

  const supplier = useSelector((state) => {
    // console.log(state);
    return state.users.supplier.data;
  });

  const supplierData = supplier ? supplier:""
  const supplierAddress = supplierData.address ? supplierData.address:""


  useEffect(() => {
    dispatch(fetchSupplierById(params.id));
  }, [dispatch]);

  

  return (
    <>
      <Container maxWidth="xl" className="MuiContainer-maxWidthMd">
        <TopAppBar />
        <Header title="Supplier" />

        <Grid container spacing={2} columns={16}>
          <Grid item xs={10}>
            <Box className="userinfo-box">
              <Typography variant="h5" component="div" className="title">
                User Information
              </Typography>

              <Grid container spacing={2} columns={16}>
                <Grid item xs={6}>
         
                  <Stack direction="column" className="stack-avatar">
                    <Avatar className="MuiAvatar-root supplier-profile" src="" />
                  </Stack>

                  <Typography variant="h5" className="MuiTypography-root supplier-name">
                    {`${supplierData.firstName} ${supplierData.lastName}`}
                  </Typography>
                  
                  <Typography className="supplier-email">
                    {supplierData.email}
                  </Typography>
                </Grid>

                <Grid item xs={10}>
                
                  <Typography variant="h6" component="div" className="sub-title">
                    Communication
                  </Typography>

                  <div className="communication-item" >
                    <LocalPhoneIcon className="communication-icon" /> 
                    <Typography variant="h5" component="div">
                        {`0${supplierData.phoneNumber}`}
                    </Typography>
                  </div>

                  <div className="communication-item" >
                      <MyLocationIcon className="communication-icon" />
                      <Typography variant="h5" component="div">
                        {`${supplierAddress.district}, ${supplierAddress.commune}, ${supplierAddress.city}`}
                      </Typography>
                  </div>
                  

                  <div className="communication-item" >
                  <AgricultureIcon className="communication-icon" /> 
                    <Typography variant="h5" component="div">
                      {supplierData.farmName}
                    </Typography>
                  </div>

                  <div className="communication-item" >
                    <OfflinePinIcon className="communication-icon" />
                    <Typography variant="h5" component="div">
                        {supplierData.createdAt}
                    </Typography>
                  </div>
                
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="userinfo-box total-info-box">
              
                <OutlinedCard
                  title="Total Product"
                  value="2"
                  icon={<Inventory2Icon />}
                />

                <OutlinedCard
                  title="Total Order"
                  value="2"
                  icon={<ShoppingBagIcon />}
                />
           
            </Box>
          </Grid>
        </Grid>

        {/* <ProductTable orders={supplierData} /> */}
        
      </Container>
    </>
  );
}

export default SupplierDetail;
