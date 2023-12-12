import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormControlLabel, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../store/slice/authV2Slice";
import Checkbox from "@mui/material/Checkbox";
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

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/cart";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

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
        navigate(redirect);
      } else {
        if (error && error.message === "USER_NOT_FOUND") {
          setEmailError("User not found");
        } else if (error && error.message === "WRONG_PASSWORD") {
          setPasswordError("Wrong password");
          // } else {
          //   setEmailError("Email or Password is incorrect");
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
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Log in
      </Typography>
      <Typography sx={{ textAlign: "center", color: "#a5a5a5" }}>
        Welcome Back!
      </Typography>

      <form onSubmit={submitHandler}>
        {/* {setEmailError && (
          <Typography color="error" sx={{ marginBottom: "16px" }}>
            {setEmailError}
          </Typography>
        )} */}
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

        {/* Remember Me and Forgot Password */}
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{ "&.Mui-checked": { color: "#82B440" } }}
            />
          }
          label={
            <Typography variant="body2">
              Remember me{" "}
              <Link to="/custom-forgot-password" className="forgot">
                Forgot Password
              </Link>
            </Typography>
          }
        />

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
            backgroundColor: "#4285F4",
            color: "white",
            margin: "24px 0",
          }}
        >
          Continue with Facebook
        </Button>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          className="mt-2"
          sx={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
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
