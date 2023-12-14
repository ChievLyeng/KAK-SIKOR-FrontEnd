import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // ...
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  // Set the default redirect path to "/profile" for the login page
  const redirect = sp.get("redirect") || "/profile";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  // ...

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Clear error messages when attempting to submit
      setEmailError("");
      setPasswordError("");

      if (!email.trim() && !password.trim()) {
        setEmailError("Username cannot be empty");
        setPasswordError("Password cannot be empty");
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

      if (data) {
        dispatch(setCredentials(data));

        // Only navigate to the user profile if the login was successful
        navigate("/profile");
      } else {
        if (error && error.message === "USER_NOT_FOUND") {
          setEmailError("User not found");
        } else if (error && error.message === "WRONG_PASSWORD") {
          setPasswordError("Wrong password");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      setPasswordError(
        err?.data?.message || err.error || "Server error occurred"
      );
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

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(""); // Clear passwordError when input changes
          }}
          error={Boolean(passwordError)}
          helperText={passwordError || "*Required"}
          sx={{
            margin: "24px 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: passwordError ? "red" : "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: passwordError ? "red" : "#82B440",
            },
          }}
        />

        <Typography variant="body2">
          <Link to="/forgotpassword" className="forgot">
            Forgot Password
          </Link>
        </Typography>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          className="mt-2"
          disabled={isLoading}
          sx={{
            marginTop: "24px",
            marginBottom: "72px",
            backgroundColor: "#82B440",
          }}
        >
          Log in
        </Button>

        <Typography sx={{ textAlign: "center", color: "#a5a5a5" }}>
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
            margin: "24px 0",
          }}
        >
          Continue with Google
        </Button>

        {isLoading && <Loader />}

        <Typography
          sx={{
            marginTop: "72px",
            textAlign: "center",
          }}
        >
          Dont have account?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="forgot"
          >
            Sign up
          </Link>
        </Typography>
      </form>
    </FormContainer>
  );
}

export default UserLogin;
