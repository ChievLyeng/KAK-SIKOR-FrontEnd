import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const OutlinedCard = ({ title, value, icon }) => {
  const defaultIconSize = 36;
  const defaultIconColor = '#82B440';

  return (
    <Box sx={{ minWidth: 400 }}>
      <Card variant="outlined" sx={{ backgroundColor: 'white' }}>
        <CardContent sx={{ position: 'relative' }}>
          <Typography sx={{ fontSize: 24 ,fontWeight : "bold"}} color="#000000" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div" color={defaultIconColor} sx={{ mb: 4 ,ml: 2}}>
            {value}
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              backgroundColor: defaultIconColor,
              borderRadius: '5px',
              padding: '4px',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
            }}
          >
            {React.cloneElement(icon, {
              sx: { fontSize: defaultIconSize, color: 'white' },
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OutlinedCard;
