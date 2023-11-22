import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "../style/ProductTable.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store";
import { fetchOrder } from "../store";

const columns = [
  {
    id: "ID",
    label: "ID",
    minWidth: 100,
    align: "left",
  },
  {
    id: "Customer",
    label: "Customer",
    minWidth: 120,
    align: "left",
  },
  {
    id: "Product",
    label: "Product",
    minWidth: 100,
    align: "left",
  },
  { id: "Payment", label: "Payment", minWidth: 100 },
  {
    id: "Amount",
    label: "Amount",
    minWidth: 120,
    align: "left",
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 120,
    align: "left",
  },
  { id: "Date", label: "Date", minWidth: 170 },
  {
    id: "Action",
    label: "Action",
    minWidth: 150,
    align: "left",
  },
];

export default function ProductTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders?.data?.orders);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrder());
  }, [dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(orders)

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          margin: "auto",
          marginTop: 4,
        }}
      >
        <h1>Recent Order </h1>
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
              {orders &&
                orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align="left">{2}</TableCell>
                      <TableCell align="left">{`${order.orderBy.firstName} ${order.orderBy.lastName}`}</TableCell>
                      <TableCell align="left">{ order.products.length >= 2 ? `(${order.products.length}) items`: `(${order.products.length}) item`} </TableCell>
                      <TableCell align="left">{2}</TableCell>
                      <TableCell align="left">{order.quantity}</TableCell>
                      <TableCell align="left">{order.status}</TableCell>
                      <TableCell align="left">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell align="left">
                        <div className="action-icon">
                          <i className="fa-regular fa-eye"></i>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          count={orders?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
