import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ThemeProvider, createTheme } from '@mui/material';



const profileTabs  = ['Post','friends'];

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Options(props) {


  const handleChange = (event, newValue) => {
    props.setStatus(newValue);
  };


  return (
   
      <AppBar position="static" >
        <Tabs
          value={props.status}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {profileTabs.map((c, index) => (
            <Tab key={index} label={c} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
   
  );
}