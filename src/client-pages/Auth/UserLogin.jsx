import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../store/slice/authV2Slice";
import { useLoginMutation } from "../../store/slice/userV2Slice";
import FormContainer from "../../components/FormContainer";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [backendError, setBackendError] = useState("");
  const { state } = useLocation();
  const registrationSuccess =
    localStorage.getItem("registrationSuccess") === "true";

  const clearRegistrationSuccess = () => {
    localStorage.removeItem("registrationSuccess");
  };

  useEffect(() => {
    clearRegistrationSuccess();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  console.log("UserInfo from Redux state:", userInfo);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = () => {
    setIsTyping(true);
    setBackendError(""); // Clear the error message
  };

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/profile";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Inside your component, where you handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setEmailError("");
      setPasswordError("");
      setBackendError("");

      if (!email.trim() && !password.trim()) {
        setEmailError("Username cannot be empty");
        setPasswordError("Password cannot be empty");
        setBackendError("Both fields are required");
        return;
      }

      if (!email.trim()) {
        setEmailError("Username cannot be empty");
        return;
      }

      if (!password.trim()) {
        setPasswordError("Password cannot be empty");
        return;
      }

      const { data, error } = await login({ email, password });

      console.log("Data from login mutation:", data);

      if (data) {
        const { token, refreshToken, data: userData } = data;

        if (userData) {
          dispatch(setCredentials({ token, refreshToken, userData }));
          navigate("/profile");
        } else {
          console.error("Invalid user data structure:", data);
        }
      } else {
        if (error && error.message === "USER_NOT_FOUND") {
          setEmailError("User not found");
        } else if (error && error.message === "WRONG_PASSWORD") {
          setPasswordError("Wrong password");
        } else if (error && error.data && error.data.message) {
          setBackendError(error.data.message);
        } else {
          setBackendError("Server error occurred");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);

      if (err?.data?.message) {
        setBackendError(err.data.message);
      } else {
        setBackendError("Server error occurred");
      }
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "41px" }}>
        Log in
      </Typography>
      <Typography sx={{ textAlign: "center", color: "#a5a5a5" }}>
        Welcome Back!
      </Typography>

      {registrationSuccess && (
        <Typography sx={{ textAlign: "center", color: "green" }}>
          Account registered successfully! Please log in.
        </Typography>
      )}

      {backendError && (
        <Alert severity="error" sx={{ marginTop: "16px" }}>
          {backendError}
        </Alert>
      )}

      <form onSubmit={submitHandler}>
        <TextField
          fullWidth
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(""); // Clear usernameError when input changes
          }}
          error={Boolean(emailError)}
          helperText={emailError || "*Required"}
          sx={{
            marginTop: "24px ",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: emailError ? "red" : "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: emailError ? "red" : "#82B440",
            },
          }}
        />

        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            margin: "24px 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#82B440",
            },
          }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={(e) => {
              handleInputChange();
              setPassword(e.target.value);
            }}
            error={Boolean(passwordError)}
          />
          <FormHelperText id="outlined-adornment-password-helper-text">
            *Required
          </FormHelperText>
        </FormControl>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          className="mt-2"
          disabled={isLoading}
          sx={{
            marginTop: "24px",
            backgroundColor: "#82B440",
          }}>
          Log in
        </Button>

        <Typography
          sx={{
            textAlign: "right",
            margin: "45px 0",
          }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#a5a5a5",
            marginBottom: "24px",
          }}>
          or Log in with
        </Typography>

        <Button
          fullWidth
          variant="contained"
          type="submit"
          className="mt-2"
          sx={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
          }}>
          Continue with Google
        </Button>

        {isLoading && <Loader />}

        <Typography
          sx={{
            marginTop: "72px",
            textAlign: "center",
          }}>
          Don't have an account? <Link to="/user-register">Sign up</Link>
        </Typography>
      </form>
    </FormContainer>
  );
}

export default UserLogin;
