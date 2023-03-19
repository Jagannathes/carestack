import React from 'react'
import {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {AuthContext} from "@/context/userContext";
import{Box, Grid, Typography, Container} from '@mui/material';
import UserCard from '@/components/users/cards';
import { display } from '@mui/system';

function users() {
    const [users, setUsers] = useState([])
    const {user, loading, authToken} = useContext(AuthContext);
    const getUsers = async () => {
        const res = await axios.get('/api/users', {
            headers:{
                "x-auth-token":authToken
            }
        })
        
        const findinInvite = (id) => {
            return user?.invites[0]?.find((invite) => invite.sender._id === id || invite.receiver._id === id)
        }
        
        const userss= user?res.data?.users
        ?.map((u) => {
            if(findinInvite(u._id)){
                u.invited = true
            }
            else{
                u.invited = false
            }
            return u
        }): res.data.users
     

        setUsers(userss)
        console.log(userss)
    }
    useEffect(()=>{
        if(!loading){
        getUsers()
        }
    },[loading])
    

  return (
    <div>
      <Box sx={{ flexGrow: 1 , }}>
        <Container maxWidth="lg">
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{display:"flex", flexGrow:1, justifyContent:"center", mt:5}}>
                
                <Typography variant="h4" component="h4" gutterBottom>
                    Users
                </Typography>
            </Grid>
            {users.map((user) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={user._id}>
                    <UserCard profile={user} />
                </Grid>
            ))}
        </Grid>
        </Container>
    </Box>

    </div>
  )
}

export default users
