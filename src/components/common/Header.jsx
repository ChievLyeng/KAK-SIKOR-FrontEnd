/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

const Header = ({ title }) => {

  const refreshPage = () => {
    window.location.reload(false)
    console.log("Refresh")
  }

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <Button
           className="MuiButton-root refresh-button"
           onClick={refreshPage}
           >
            Refresh
          </Button>
        }
      />
    </Card>
  );
};

export default Header;
