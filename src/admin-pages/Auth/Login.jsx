import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { loginUser } from "../../store/thunks/authApi";
import "../../style/Auth.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(email);
  console.log(password);

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
    console.log("click!");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container maxWidth="md" className="login-container">
        <Box className="login-box">
          <div>
            <Typography variant="h3" component="div" className="login-title">
              LOGIN
            </Typography>
            <Typography variant="h5" component="div">
              KAKSIKOR ADMINISTRATOR
            </Typography>
          </div>
          <form onSubmit={handleLogin}>
            <TextField
              className="login-textfield"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="secondary"
              // className="MuiTextField-root textfield"
              helperText="Required"
              id="demo-helper-text-misaligned"
              label="Email"
              sx={{ marginBottom: "24px" }}
            />

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                sx={{ marginBottom: "24px" }}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color="secondary"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <div className="login-btn-container">
              <Button
                variant="contained"
                size="large"
                type="submit"
                className="login-btn"
              >
                Login
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </>
  );
}
