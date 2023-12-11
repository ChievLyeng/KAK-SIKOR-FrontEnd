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
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      console.log("Login Data:", data);

      if (data) {
        dispatch(setCredentials(data));
        navigate(redirect);
      } else {
        setErrorMessage("Invalid credentials or server error");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrorMessage(
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
        {errorMessage && (
          <Typography color="error" sx={{ marginBottom: "16px" }}>
            {errorMessage}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="*Required"
          sx={{
            marginTop: "24px ",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#82B440",
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="*Required"
          sx={{
            margin: "24px 0",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#82B440",
              },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#82B440",
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
