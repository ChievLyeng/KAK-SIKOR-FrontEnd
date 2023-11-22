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
import { fetchProducts, deleteProduct } from "../store";
import { Link } from "react-router-dom";

const columns = [
  {
    id: "ID",
    label: "ID",
    minWidth: 170,
    align: "left",
  },
  {
    id: "Product",
    label: "Product",
    minWidth: 170,
    align: "left",
  },
  { id: "Category", label: "Category", minWidth: 100 },
  {
    id: "Price",
    label: "Price",
    minWidth: 170,
    align: "left",
  },

  {
    id: "Quantity",
    label: "Quantity",
    minWidth: 170,
    align: "left",
  },
  { id: "Supplier", label: "Supplier", minWidth: 170 },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
    align: "left",
  },
];

export default function ProductTable() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.data.products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(productId))
        .unwrap()
        .then(() => {
          dispatch(fetchProducts()); // Refetch products after deletion
        })
        .catch((error) => {
          console.error("Delete product error:", error);
        });
    }
  };

  console.log(productData);

  return (
    <Paper
      sx={{
        width: "85%",
        overflow: "hidden",
        marginLeft: "auto",
        marginRight: "0",
        marginTop: 20,
      }}
    >
      <h1>Product List</h1>
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
            {productData &&
              productData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="left">{product._id}</TableCell>
                    <TableCell align="left">{product.name}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell align="left">{product.price}</TableCell>
                    <TableCell align="left">{product.quantity}</TableCell>
                    <TableCell>{product.Supplier.email}</TableCell>
                    <TableCell>
                      <div className="action-icon">
                        <Link>
                          <i className="fa-regular fa-eye"></i>
                        </Link>
                        <Link to={`/update-product/${product._id}`}>
                          <i className="fa-solid fa-pen-to-square edit-icon"></i>
                        </Link>
                        <Link>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDeleteProduct(product._id)}
                          ></i>
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
        count={productData ? productData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
