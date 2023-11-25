import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import '../style/MyAccount.css'

const AccountInformation = () => {
  const [useraccount, setUseraccount] = useState();

  const getUser = () => {
    const data = localStorage.getItem("user");
    setUseraccount(JSON.parse(data));
    console.log(JSON.parse(data));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: "50px", marginRight: "0px" }}>
        <Grid container columns={16} gap={2}>
          {/* profile */}
          <Grid item xs={4} sx={{ background: "gray", height: "200px" }}>
            <div>hello</div>
          </Grid>

          {/* user detail */}
          <Grid item xs={11} sx={{ background: "gray", height: "250px" }}>
            <div className="name">
              <div>
                <label>FirstName</label>
                <br />
                <TextField id="demo-helper-text-misaligned-no-helper" />
              </div>

              <div>
              <label>FirstName</label>
                <br />
                <TextField id="demo-helper-text-misaligned-no-helper" />
              </div>
            </div>

              <div>
              <label>FirstName</label>
                <br />
                <TextField id="demo-helper-text-misaligned-no-helper" />
              </div>
           
              <div className="name">
              <div>
                <label>FirstName</label>
                <br />
                <TextField id="demo-helper-text-misaligned-no-helper" />
              </div>

              <div>
              <label>FirstName</label>
                <br />
                <TextField id="demo-helper-text-misaligned-no-helper" />
              </div>
            </div>

            <div>
              <label>FirstName</label>
                <br />
                <TextField id="demo-helper-text-misaligned-no-helper" />
              </div>

              <div>
              <label>FirstName</label>
                <br />
                <TextField id="demo-helper-text-misaligned-no-helper" />
              </div>

          <button>Update</button>

          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AccountInformation;
