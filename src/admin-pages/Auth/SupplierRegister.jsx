import { useState, useEffect } from "react";
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
import "../../style/UserRegister.css";
import { format } from "date-fns";
import { setCredentials } from "../../store/slice/authV2Slice";
import { useRegisterMutation } from "../../store/slice/userV2Slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterSupplierScreen() {
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
    farmName: "", // Add farmName
    harvestSchedule: "", // Add harvestSchedule
    isOrganic: false, // Add isOrganic
    supplierStatus: "pending", // Add supplierStatus
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/login";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const [errors, setErrors] = useState({});

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
        toast.error("Invalid credentials or server error");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Format the birthDate before rendering
  const formattedBirthDate = formData.birthDate
    ? format(new Date(formData.birthDate), "yyyy-MM-dd")
    : "";

  return (
    <form onSubmit={submitHandler} className="form-container">
      <Typography variant="h6" className="title">
        Business Account Sign up
      </Typography>
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
          onChange={handleChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

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
      />

      <TextField
        fullWidth
        label="Harvest Schedule"
        type="date"
        name="harvestSchedule"
        value={formData.harvestSchedule}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        helperText="Optional"
      />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="organic-label">Is Organic</InputLabel>
        <Select
          labelId="organic-label"
          label="Is Organic"
          name="isOrganic"
          value={formData.isOrganic}
          onChange={handleChange}
        >
          <MenuItem value={false}>No</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            sx={{ "&.Mui-checked": { color: "#82B440" } }}
          />
        }
        label={
          <Typography variant="body2">
            I accept and agree to the{" "}
            <Link to="/custom-forgot-password" className="forgot">
              Term of use
            </Link>
          </Typography>
        }
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </form>
  );
}

export default RegisterSupplierScreen;
