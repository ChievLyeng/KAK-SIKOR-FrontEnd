import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { format } from "date-fns";
import { setCredentials } from "../../store/slice/authV2Slice";
import { useRegisterMutation } from "../../store/slice/userV2Slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";

function SupplierRegister() {
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
    farmName: "",
    harvestSchedule: "",
    isOrganic: false,
    supplierStatus: "pending",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/userlogin";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const [errors, setErrors] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is nested inside the address object
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Clear the error message when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    setIsTyping(true);
    const newPassword = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
    validatePassword(newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setIsTyping(true);
    setFormData((prevData) => ({
      ...prevData,
      confirmPassword: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await register(formData);
      if (data) {
        dispatch(setCredentials(data));
        navigate(redirect);
      } else {
        console.error("Invalid credentials or server error");
      }
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  // Format the birthDate before rendering
  const formattedBirthDate = formData.birthDate
    ? format(new Date(formData.birthDate), "yyyy-MM-dd")
    : "";

  return (
    <FormContainer>
      <form onSubmit={submitHandler}>
        <Typography variant="h5" className="title">
          Business Account Sign up
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
            sx={styles.textField}
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
            sx={styles.textField}
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
          sx={styles.textField}
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
          sx={styles.textField}
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
          sx={styles.textField}
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
            sx={styles.textField}
          />
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            sx={styles.textField}>
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
            sx={styles.textField}
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
            sx={styles.textField}
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
            sx={styles.textField}
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
            sx={styles.textField}
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
            sx={styles.textField}
          />
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <TextField
            fullWidth
            label="Harvest Schedule"
            type="date"
            name="harvestSchedule"
            value={formData.harvestSchedule}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            sx={styles.textField}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="Optional"
          />

          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            sx={styles.textField}>
            <InputLabel id="organic-label">Is Organic</InputLabel>
            <Select
              labelId="organic-label"
              label="Is Organic"
              name="isOrganic"
              value={formData.isOrganic}
              onChange={handleChange}>
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField
          fullWidth
          label="Farm Name"
          type="text"
          name="farmName"
          value={formData.farmName}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          helperText="Optional"
          sx={styles.textField}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handlePasswordChange}
          margin="normal"
          variant="outlined"
          helperText={errors.password || "*Required"}
          error={Boolean(errors.password)}
          sx={styles.textField}
        />
        {isTyping && (
          <div style={{ marginTop: "8px", marginLeft: "15px" }}>
            {Object.keys(passwordValidation).map((key) => (
              <Typography
                key={key}
                variant="caption"
                color={passwordValidation[key] ? "green" : "red"}
                sx={{
                  display: "flex",
                }}>
                {passwordValidation[key] ? "✓" : "✗"} {key}
              </Typography>
            ))}
          </div>
        )}

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange}
          margin="normal"
          variant="outlined"
          helperText={errors.confirmPassword || "*Required"}
          error={Boolean(errors.confirmPassword)}
          sx={styles.textField}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{ "&.Mui-checked": { color: "#82B440", margin: " 21px 0" } }}
            />
          }
          label={
            <Typography variant="body2">
              I accept and agree to the{" "}
              <Link to="/custom-forgot-password">Term of use</Link>
            </Typography>
          }
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#82B440" }}
          fullWidth>
          Register
        </Button>
      </form>
    </FormContainer>
  );
}

const styles = {
  textField: {
    margin: "15px 0",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#82B440",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#82B440",
    },
  },
};

export default SupplierRegister;
