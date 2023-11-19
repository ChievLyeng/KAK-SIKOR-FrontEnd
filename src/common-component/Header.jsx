import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';

const Header = ({ backgroundColor, color, marginBottom, height, titlePaddingLeft, titlePaddingTop, titlePaddingBottom }) => {
  const cardStyle = {
    backgroundColor,
    color,
    marginBottom,
    height,
    padding: 0, // Remove default padding
  };

  const cardHeaderStyle = {
    paddingLeft: titlePaddingLeft,
    paddingBottom: titlePaddingBottom,
    paddingTop: titlePaddingTop,
    backgroundColor,
    color,
  };

  return (
    <Card sx={cardStyle}>
      <CardHeader
        title="Dashboard"
        action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //     </IconButton>
            
        <Button sx={{ color: "#82B440", mr: 2}} >
            Refresh 
        </Button>
            
        }
        sx={cardHeaderStyle}
      />
    </Card>
  );
};

export default Header;
