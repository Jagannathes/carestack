import React from 'react';
import {styled} from '@mui/system'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Image = styled('div')({
  backgroundImage: 'url(https://placekitten.com/1200/800)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
});

const InfoText = styled('div')(({ theme }) => ({
  color: 'white',
  
}));

const LoginButton = styled(Button)({
  margin: '16px',
});


function LandingPage ()  {
  

  return (
    <div>
      
    </div>
  );
};


export default LandingPage;