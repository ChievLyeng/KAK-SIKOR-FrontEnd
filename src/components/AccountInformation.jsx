import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import "../style/MyAccount.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const genders = ["Male", "Female"];

const AccountInformation = () => {
  const [user, setUser] = useState();
  const [selectedGender, setSelectedGender] = useState('Male');
  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmpassword,setConfirmPassword] = useState()
  

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };


  const getUser = () => {
    const data = localStorage.getItem("user");
    setUser(JSON.parse(data));
  };
  console.log()

  useEffect(() => {
    getUser();
    
  }, []);

  const useraccount = user?.user || null

  console.log(useraccount)

  return (
    <>
      <Grid container columns={16} gap={10} className="container-all-grid">
        {/* profile */}
        <Grid item xs={4} className="profile-grid">
          <Box className="profile-box">
            <Typography variant="h5" component="div" className="profile-title">
              Profile
            </Typography>

            <Stack>
              <Avatar className="MuiAvatar-root supplier-profile" src="" />
            </Stack>

            <Button
              className="change-photo-btn"
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Change Photo
              <VisuallyHiddenInput type="file" />
            </Button>

            <div className="name-role-contianer">
              <Typography variant="h5" className="profile-title">
                {`${useraccount?.firstName} ${useraccount?.lastName}`}
              </Typography>

              <Typography className="profile-title"> {useraccount?.role} </Typography>
            </div>
          </Box>
        </Grid>

        {/* user detail */}
        <Grid item xs={11} className="user-detail-grid">
          <Typography
            variant="h5"
            component="div"
            className="user-detail-title"
          >
            Profile Detail
          </Typography>

          <Grid container>
            <Grid item xs={6}>
              <Box className="two-textfield-container">
                <label className="textfield-label"> First Name</label>
                <TextField fullWidth id="fullWidth" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="two-textfield-container">
                <label className="textfield-label"> Last Name</label>
                <TextField fullWidth id="fullWidth" />
              </Box>
            </Grid>

            <Grid item xs={16}>
              <Box className="one-textfield-container">
                <label className="textfield-label">Email</label>
                <TextField fullWidth id="fullWidth" />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box className="two-textfield-container">
                <label className="textfield-label"> Phone Number </label>
                <TextField fullWidth id="fullWidth" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                className="one-textfield-container"
                noValidate
                autoComplete="off"
              >
                <label className="textfield-label"> Gener </label>
                <TextField
                    fullWidth
                    id="outlined-select-gender"
                    select
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </TextField>
       
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="one-textfield-container">
                <label className="textfield-label"> Password </label>
                <TextField fullWidth id="fullWidth" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="one-textfield-container">
                <label className="textfield-label"> Confirm Password </label>
                <TextField fullWidth id="fullWidth" />
              </Box>
            </Grid>
          </Grid>

          <Button variant="contained" className="update-btn">
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountInformation;
