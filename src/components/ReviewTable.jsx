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
import { fetchReview } from "../store";

const columns = [
  {
    id: "FullName",
    label: "Name",
    minWidth: 170,
    align: "left",
  },
  { id: "product", label: "Product", minWidth: 170 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right",
  },
  {
    id: "rating",
    label: "Rating",
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

export default function ReviewTable() {
  const dispatch = useDispatch();
  const reviewData = useSelector((state) => state.reviews.data?.data?.reviews);

  useEffect(() => {
    dispatch(fetchReview());
  }, [dispatch]);

  console.log("reviewdata", reviewData);

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
        width: "80%",
        overflow: "hidden",
        marginLeft: "auto",
        marginRight: "0",
        marginTop: 30,
      }}
    >
      <h1>Review List :</h1>
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
            {reviewData &&
              reviewData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((review, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="left">
                      {review.userId?.firstName} {review.userId?.lastName}
                    </TableCell>
                    <TableCell align="left">{review.product?.name}</TableCell>
                    <TableCell align="right">{review.description}</TableCell>
                    <TableCell align="right">{review.rating}</TableCell>
                    <TableCell align="right">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={reviewData ? reviewData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
