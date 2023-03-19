import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/userContext';
import { Box, Grid, Typography, Container } from '@mui/material';
import InviteCard from '@/components/invites/card';
import { useRouter } from 'next/router';
import FullPageLoader from '@/components/Loader/fullLoader';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Users() {
  const [users, setUsers] = useState([]);
  const { user, loading, authToken } = useContext(AuthContext);
  const router = useRouter();
  const [alignment, setAlignment] = useState('send');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (!loading && !user) {
      alert('please login to view this page');
      router.push('/');
    }
  }, [loading, user]);

  if (loading || !user) return <FullPageLoader />;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                mt: 5,
              }}
            >
              <Typography variant="h4" component="h4" gutterBottom>
                Users
              </Typography>
          </Grid>
          <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                mt: 5,
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="send">sent</ToggleButton>
                <ToggleButton value="receive">received</ToggleButton>
              </ToggleButtonGroup>
            
            </Grid>
            
            {alignment=='receive' && user?.invites[0]?.map(
              (invite) =>
                invite.sender.uid !== user.uid && (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={user._id}>
                    <InviteCard profile={invite.sender} id={invite._id} user={user} status="receive"  invite={invite}/>
                  </Grid>
                ),
            )}
              {alignment=='send' && user?.invites[0]?.map(
              (invite) =>
                invite.receiver.uid !== user.uid && (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={user._id}>
                    <InviteCard profile={invite.receiver} id={invite._id}status="send"  invite={invite}/>
                  </Grid>
                ),
            )}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Users;
