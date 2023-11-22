import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchUser, deleteUser } from "../store";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const columns = [
  {
    id: "id",
    label: "ID",
    minWidth: 170,
    align: "left",
  },
  {
    id: "FullName",
    label: "Name",
    minWidth: 170,
    align: "left",
  },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "gender", label: "Gender", minWidth: 100 },
  {
    id: "Phone Number",
    label: "Phone Number",
    minWidth: 170,
    align: "left",
  },
  {
    id: "role",
    label: "Role",
    minWidth: 170,
    align: "left",
  },
  {
    id: "CreateAt",
    label: "Create At",
    minWidth: 170,
    align: "left",
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
    align: "left",
  },
];

const UsersTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.data?.data?.users);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(usersData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchName(event.target.value);
    setPage(0);
  };

  const filteredUsers = (usersData || []).filter((user) =>
    selectedRole ? user.role === selectedRole : true
  );

  const filteredUsersByName = (filteredUsers || []).filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const formattedSearch = searchName.toLowerCase().trim();
    return fullName.includes(formattedSearch);
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId)).then(() => {
        dispatch(fetchUser());
      });
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Paper
      sx={{
        width: "85%",
        overflow: "hidden",
        margin: "auto",
        marginTop: 20,
      }}
    >
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchName}
        onChange={handleSearch}
        sx={{ marginTop: 2, marginBottom: 7, width: 250, marginLeft: 1 }}
      />
      <h1 className="users-header">User List </h1>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="role-select-label">Filter by Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRole}
          label="Filter by Role"
          onChange={handleRoleChange}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="supplier">Supplier</MenuItem>
          <MenuItem value="user">User</MenuItem>
          {/* Add more roles as needed */}
        </Select>
      </FormControl>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsersByName
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell align="left">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell align="left">{user.phoneNumber}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell align="left">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="action-icon">
                      <Link to={`/supplier/${user._id}`}>
                        <i className="fa-regular fa-eye"></i>
                      </Link>
                      <Link onClick={() => handleDeleteUser(user._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredUsersByName ? filteredUsersByName.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UsersTable;
