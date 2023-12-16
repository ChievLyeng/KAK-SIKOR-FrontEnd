/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { updateUserById } from "../store/thunks/authApi";
import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from "@mui/material";
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
  const [selectedGender, setSelectedGender] = useState("Male");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [updatesuccess,setUpdateSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user._id || "";
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {

    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");
    setPhone(user?.phoneNumber || "");
    
  }, []);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("update click!");

    try {
       const updatedData = await updateUserById(
        {
          userId,
          firstName,
          lastName,
          phone,
          gender: selectedGender,
          token,
        },

      );
      
      if(updatedData){
        localStorage.setItem("user",JSON.stringify(updatedData?.updatedUser))
        setUpdateSuccess(true)
        
      }

      console.log(updatedData)
      

    } catch (error) {
      // Handle error
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
    

      <form onSubmit={handleSubmit}>
        <Grid container columns={16} gap={10} className="container-all-grid">
          {/* profile */}
          <Grid item xs={4} className="profile-grid">
            <Box className="profile-box">
              <Typography
                variant="h5"
                component="div"
                className="profile-title"
              >
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
                  {`${user?.data?.user?.firstName} ${user?.data?.user?.lastName}`}
                </Typography>

                <Typography className="profile-title">
                  {" "}
                  {user?.data?.user?.role}{" "}
                </Typography>
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
                  <TextField
                    fullWidth
                    id="fullWidth"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="two-textfield-container">
                  <label className="textfield-label"> Last Name</label>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Box>
              </Grid>

              <Grid item xs={16}>
                <Box className="one-textfield-container">
                  <label className="textfield-label">Email</label>
                  <TextField fullWidth id="fullWidth" value={email} />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box className="two-textfield-container">
                  <label className="textfield-label"> Phone Number </label>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    value={`0${phone}`}
                    onChange={(e) => setPhone(e.target.value.replace(/^0/, ""))}
                  />
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

            <Button type="submit" variant="contained" className="update-btn">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
          open={updatesuccess}
          autoHideDuration={3000}
          onClose={() => setUpdateSuccess(false)}
          message="Update successfully!"
        />
      {/* <Stack sx={{ width: '100%' }} spacing={2}
      open = {updatesuccess}
      onClose={()=> setUpdateSuccess(false)}
      >
      <Alert variant="outlined" severity="success">
        Update Successfully!
      </Alert>
    </Stack> */}
    </>
  );
};

export default AccountInformation;
