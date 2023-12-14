import * as React from 'react';
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
import OpenDialog from "./common/OpenDialog";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';


const emails = ['Completed', 'Delivery','Paid'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>Order Status</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


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
    return state.orders?.data;
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrder());
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
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
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
    
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
                      <TableCell align="left">{order.user?._id}</TableCell>
                      <TableCell align="left">{`${order.user?.firstName} ${order.user?.lastName}`}</TableCell>
                      <TableCell align="left">
                        {order.orderItems?.length >= 2
                          ? `(${order.orderItems?.length}) items`
                          : `(${order.orderItems?.length}) item`}{" "}
                      </TableCell>
                      <TableCell align="left">{order.paymentMethod}</TableCell>
                      <TableCell align="left"> $ {order.totalPrice}</TableCell>
                      <TableCell align="left">
                        {order.isPaid ? "Paid" : "Not yet paid"}
                      </TableCell>
                      <TableCell align="left">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="left">
                        <div className="action-icon">
                          <i className="fa-regular fa-eye"></i>
                         
                          <i className="fa-solid fa-pen-to-square"
                          onClick={handleClickOpen}
                          ></i>
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
