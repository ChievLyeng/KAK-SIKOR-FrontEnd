import React, { useState, useEffect } from "react";
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

const columns = [
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
    align: "right",
  },
  {
    id: "role",
    label: "Role",
    minWidth: 170,
    align: "right",
  },

  {
    id: "CreateAt",
    label: "Create At",
    minWidth: 170,
    align: "right",
  },
];

export default function UsersTable() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.data?.data?.users);
  const productData = useSelector((state) => state.products.data.products);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("Product data ", productData);
  console.log("Userdata", usersData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "85%",
        overflow: "hidden",
        marginLeft: "auto",
        marginRight: "0",
        marginTop: 30,
      }}
    >
      <h1>User List :</h1>
      <br />
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {usersData &&
              usersData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="left">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell align="right">{user.phoneNumber}</TableCell>
                    <TableCell align="right">{user.role}</TableCell>
                    <TableCell align="right">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={usersData ? usersData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
