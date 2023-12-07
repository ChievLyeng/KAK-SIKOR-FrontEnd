import { Container } from "@material-ui/core";
import { Outlet } from "react-router-dom";
import TopAppBar from "./components/TopAppBar";

const App = () => {
  return (
    <>
      <TopAppBar />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default App;
