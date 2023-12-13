import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  // Define your columns here
  { id: 'orderId', label: 'Order ID', minWidth: 100 },
  { id: 'customerName', label: 'Customer Name', minWidth: 150 },
  { id: 'itemCount', label: 'Item Count', minWidth: 100 },
  { id: 'additionalColumn', label: 'Additional Column', minWidth: 100 },
  { id: 'quantity', label: 'Quantity', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'createdAt', label: 'CreatedAt', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

const ProductTable = ({ orders, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        margin: 'auto',
        marginTop: 4,
      }}
    >
      <h1>Recent Order </h1>
      <br />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="left" style={{ minWidth: column.minWidth }}>
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
                    <TableCell align="left">{order._id.slice(-8)}</TableCell>
                    <TableCell align="left">{`${order.orderBy.firstName} ${order.orderBy.lastName}`}</TableCell>
                    <TableCell>
                      {order.products.length >= 2
                        ? `(${order.products.length}) items`
                        : `(${order.products.length}) item`}
                    </TableCell>
                    <TableCell align="left">{/* Your additional column data */}</TableCell>
                    <TableCell align="left">{order.quantity}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
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
        count={orders && orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
