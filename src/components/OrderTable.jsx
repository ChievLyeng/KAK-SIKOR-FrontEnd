import * as React from "react";
import { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import VisibilityIcon from '@mui/icons-material/Visibility';

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
  const orders = useSelector((state) => {
    return state.orders?.data?.data?.orders;
  });
  

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
        <TableContainer sx={{ maxHeight: "100vh" }}>
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
                      <TableCell align="left">{order?._id}</TableCell>
                      <TableCell align="left">{`${order.user?.firstName} ${order.user?.lastName}`}</TableCell>
                      <TableCell align="left">
                        {order.orderItems?.length >= 2
                          ? `(${order.orderItems?.length}) items`
                          : `(${order.orderItems?.length}) item`}{" "}
                      </TableCell>
                      <TableCell align="left">{order.paymentMethod}</TableCell>
                      <TableCell align="left">
                        {" "}
                        &#x24; {order.totalPrice}
                      </TableCell>
                      <TableCell align="left">
                        {order.isDelivered ? (
                          <Typography
                            sx={{
                              background: "#4CAF50", // Green color for delivered
                              color: "white",
                              width: "80px",
                              textAlign: "center",
                              paddingTop: "4px",
                              paddingBottom: "4px",
                              borderRadius: "5px",
                            }}
                          >
                            Delivered
                          </Typography>
                        ) : order.isPaid ? (
                          <Typography
                            sx={{
                              background: "#82B440", // Light green color for paid
                              color: "white",
                              width: "80px",
                              textAlign: "center",
                              paddingTop: "4px",
                              paddingBottom: "4px",
                              borderRadius: "5px",
                            }}
                          >
                            Paid
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              background: "#3876BF", // Blue color for pending
                              color: "white",
                              width: "80px",
                              textAlign: "center",
                              paddingTop: "4px",
                              paddingBottom: "4px",
                              borderRadius: "5px",
                            }}
                          >
                            Pending
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="left">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        }).format(new Date(order.createdAt))}
                      </TableCell>
                      <TableCell align="left">
                        <Link to="/" className="link">
                            <VisibilityIcon sx={{width:"30px"}} />
                        </Link>
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
