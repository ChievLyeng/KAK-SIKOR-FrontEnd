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
import { fetchProducts, fetchUser } from "../store";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRole, setSelectedRole] = useState(""); // State to store selected role

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update selected role
    setPage(0); // Reset page when role changes
  };

  const filteredUsers = (usersData || []).filter((user) =>
    selectedRole ? user.role === selectedRole : true
  );

  const handleView = () => {
    console.log("Clicked!")
  }


  return (
    <Paper
      sx={{
        width: "85%",
        overflow: "hidden",
        margin: "auto",
        // marginLeft: "auto",
        // marginRight: "0",
        marginTop: 24,
      }}
    >
      <h1 className="users-header">User List :</h1>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel
          id="demo-simple-select-label"
          shrink={selectedRole !== ""}
          sx={{
            backgroundColor: "white",
            paddingTop: "5px",
            paddingRight: "5px",
            borderRadius: "4px",
          }}
        >
          Select Role
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          value={selectedRole}
          onChange={handleRoleChange}
          sx={{
            paddingTop: "6px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            "&:focus": {
              borderColor: "#4a90e2",
              boxShadow: "0 0 0 0.2rem rgba(74, 144, 226, 0.25)",
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="supplier">Supplier</MenuItem>
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
            {filteredUsers
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
                          <Link>
                            <i className="fa-solid fa-pen-to-square"></i>
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
        count={filteredUsers ? filteredUsers.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UsersTable;
