import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { format } from "date-fns";
import { setCredentials } from "../../store/slice/authV2Slice";
import { useRegisterMutation } from "../../store/slice/userV2Slice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";

function UserRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [register] = useRegisterMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/userlogin";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
    address: {
      city: "",
      homeNumber: "",
      street: "",
      commune: "",
      district: "",
      village: "",
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = () => {
    setIsTyping(true);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updateAddress = (addressField) => {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    };

    name.includes("address.")
      ? updateAddress(name.split(".")[1])
      : setFormData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "username",
      "phoneNumber",
      "email",
      "password",
      "confirmPassword",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await register(formData);

      if (data) {
        dispatch(setCredentials(data));
        localStorage.setItem("registrationSuccess", "true");
        navigate("/userlogin");
      } else {
        console.error("Invalid credentials or server error");
      }
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  const formattedBirthDate = formData.birthDate
    ? format(new Date(formData.birthDate), "yyyy-MM-dd")
    : "";

  return (
    <form onSubmit={submitHandler} className="form-container">
      <FormContainer>
        <Typography
          variant="h4"
          className="title"
          sx={{ fontWeight: "bolder", textAlign: "center", margin: "24px" }}>
          Sign up
        </Typography>

        <div style={{ display: "flex", gap: "16px" }}>
          <TextField
            fullWidth
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText={errors.firstName || "*Required"}
            error={Boolean(errors.firstName)}
          />
          <TextField
            fullWidth
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText={errors.lastName || "*Required"}
            error={Boolean(errors.lastName)}
          />
        </div>

        <TextField
          fullWidth
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          helperText={errors.username || "*Required"}
          error={Boolean(errors.username)}
        />

        <TextField
          fullWidth
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          helperText={errors.email || "*Required"}
          error={Boolean(errors.email)}
        />

        <TextField
          fullWidth
          label="Phone Number"
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          helperText={errors.phoneNumber || "*Required"}
          error={Boolean(errors.phoneNumber)}
        />

        <div style={{ display: "flex", gap: "16px" }}>
          <TextField
            fullWidth
            label="Birth Date"
            type="date"
            name="birthDate"
            value={formattedBirthDate}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.birthDate || "Optional"}
            error={Boolean(errors.birthDate)}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <TextField
            fullWidth
            label="City"
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText="Optional"
            error={Boolean(errors.address?.city)}
          />
          <TextField
            fullWidth
            label="Home Number"
            type="text"
            name="address.homeNumber"
            value={formData.address.homeNumber}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText="Optional"
            error={Boolean(errors.address?.homeNumber)}
          />
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <TextField
            fullWidth
            label="Street"
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText="Optional"
            error={Boolean(errors.address?.street)}
          />
          <TextField
            fullWidth
            label="Commune"
            type="text"
            name="address.commune"
            value={formData.address.commune}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText="Optional"
            error={Boolean(errors.address?.commune)}
          />
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <TextField
            fullWidth
            label="District"
            type="text"
            name="address.district"
            value={formData.address.district}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText="Optional"
            error={Boolean(errors.address?.district)}
          />
          <TextField
            fullWidth
            label="Village"
            type="text"
            name="address.village"
            value={formData.address.village}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText="Optional"
            error={Boolean(errors.address?.village)}
          />
        </div>
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          helperText={errors.password || "*Required"}
          error={Boolean(errors.password)}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          helperText={errors.confirmPassword || "*Required"}
          error={Boolean(errors.confirmPassword)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#82B440", margin: "24px 0" }}>
          Register
        </Button>
      </FormContainer>
    </form>
  );
}

export default UserRegister;
