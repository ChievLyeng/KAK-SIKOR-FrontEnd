import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

const Header = ({ title }) => {
  return (
    <Card>
      <CardHeader 
        title={title}
        action={
          <Button className="MuiButton-root refresh-button">Refresh</Button>
        }
      />
    </Card>
  );
};

export default Header;
