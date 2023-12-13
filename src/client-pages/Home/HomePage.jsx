import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../../store";
import ClientTopBar from "../../components/ClientTopBar";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null); // Set an initial value for currentUser
  const productData = useSelector((state) => state.products.data.products);
  const categoriesData = useSelector(
    (state) => state.categories.data.categories
  );
  const user = useSelector((state) => state.auth?.login?.currentUser); // Get currentUser from state directly

  console.log("Current User : ", currentUser); // Log user instead of currentUser

  console.log(categoriesData);
  console.log(productData);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    setCurrentUser(user);
  }, [dispatch, user]);

  return (
    <>
      <ClientTopBar />
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          marginTop: "24px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <InputBase
            placeholder="Search…"
            sx={{
              color: "black",
              width: "90%",
              border: "1px solid green",
              borderRadius: 4,
              padding: "8px 12px",
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HomePage;
