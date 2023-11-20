import Header from "../../common-component/Header";
import TopAppBar from "../../components/TopAppBar";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSupplierById } from "../../store";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import OutlinedCard from "../../common-component/Card";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Grid from '@mui/material/Grid';
import { BorderAllRounded } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function SupplierDetail() {
  const dispatch = useDispatch();
  const params = useParams();

  const supplier = useSelector((state) => {
    console.log(state);
    return state.users.data;
  });
  console.log(supplier);

  useEffect(() => {
    dispatch(fetchSupplierById(params.id));
  }, [dispatch]);

  console.log(params.id);

  return (
    <>
      <Container maxWidth="xl" className="MuiContainer-maxWidthMd">
        <TopAppBar />
        <Header title="Supplier" />

        


            <OutlinedCard
              title="Total Product"
              value="2"
              icon={<Inventory2Icon />}
            />      

            <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
                <Box
                sx={{ backgroundColor: "#3498db", 
                color: "#ffffff", 
                padding: "16px",
                marginTop:'100px',
                height: '300px'
                }}>
            <Typography variant="h5" component="div">
                User Information
            </Typography>

             <Grid container spacing={2} columns={16} >
                <Grid item xs={8}>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Stack>
                </Grid>

                <Grid item xs={8}>
                   <Typography variant="h5" component="div">
                        Chiev Lyeng
                     </Typography>
                     <Typography variant="h5" component="div">
                        lyeng@gmail.com
                     </Typography>
                </Grid>

                <Card>
                    <Typography variant="h5" component="div">
                        communication
                    </Typography>
                </Card>

                
             </Grid>

                    
                </Box>
                
            </Grid>
            <Grid item xs={8}>
                <Box
                    sx={{ backgroundColor: "#3498db", 
                    color: "#ffffff", 
                    padding: "16px",
                    marginTop:'100px',
                    height: '300px'
                    }}
                    >
                    <Card>
                        <Typography variant="h5" component="div">
                            User Information
                        </Typography>
                    </Card>
                </Box>
            </Grid>
            </Grid>

      </Container>
    </>
  );
}

export default SupplierDetail;
