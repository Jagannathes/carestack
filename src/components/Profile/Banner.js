import * as React from 'react';
import {useContext, useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Button} from '@mui/material';
import {AuthContext} from '@/context/userContext';
import {useRouter} from 'next/router';
import axios from 'axios';

import DoneIcon from '@mui/icons-material/Done';


const AnonymousUserControls = () => {
    return(
      <Box 
    sx = {{ 
      mt : 3,
      mb : 3,
      display : 'flex',
      justifyContent : 'center'
    }}
  >   
  
      <Button 
        variant = "contained"
        color = "primary"
        sx = {{
          mr : 2
        }}
       onClick = {()=>{
           alert('You need to login to follow this user');
       }}
      >
          FOLLOW
      </Button>
    
      <Button 
        variant = "contained"
        color = "error"
       onClick = {()=>{
            alert('You need to login to be friends with this user');
        }}  
      >
          add friend
      </Button>
  </Box>
    )
    }


const UserControls = () => {
  const router = useRouter();
  return (
    <Box 
    sx = {{ 
      mt : 3,
      mb : 3,
      display : 'flex',
      justifyContent : 'center'
    }}
  >
    <Button variant="contained" color="primary" onClick = {()=>{router.push('/editProfile')}}>
      Edit Profile
    </Button>
    </Box>
  )
}


const Controls = ({profileData, followerId, profileId, followerData}) => {
const [isFollowing, setIsFollowing] = useState(false);

useEffect(()=>{
  if(followerId){
    // getFollowing(followerId, profileId).then(res=>{
    //   setIsFollowing(res);
    // })
  }
},[followerId, profileId]);

const followUser = () => {
//   if(!followerId)alert()
//   axios.post('/api/follow', {
//     userData : {...profileData,id: profileId},
//     followerData : {...followerData, id: followerId}
//   }).then(res => {
//     console.log(res.data);
//     setIsFollowing(res.data.success);
//   })
}   

const unFriendUser = () => {
//   axios.delete(`/api/friend?uid=${profileId}&followerId=${followerId}`).then(res => {
//     console.log(res.data);
//     setIsFollowing(!res.data.success);
//   })

}

  return (
    <Box 
    sx = {{ 
      mt : 3,
      mb : 3,
      display : 'flex',
      justifyContent : 'center'
    }}
  >   
    { isFollowing ?
    
    <Button 
        variant = "contained"
        color = "error"
        sx = {{
          mr : 2
        }}
        onClick = {()=>{
          unFollowUser();
      }}
      >
        UNFOLLOW
      </Button>
    
    :
      <Button 
        variant = "contained"
        color = "primary"
        sx = {{
          mr : 2
        }}
       onClick = {()=>{
           followUser();
       }}
      >
          FOLLOW
      </Button>
    }
      <Button 
        variant = "contained"
        color = "error"
       
      >
          add friend
      </Button>
  </Box>
  )}



const FlexBox =  (props) => {  
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      m :  props.m,
     
      borderRadius: 1,
    }}
  >
    {props.children}
  </Box>
)}


export default function Banner({profile, profileId}) {
  const {user} = useContext(AuthContext);
  
  return (
    <>
    <Box sx = {{flexGrow:1}}>
   
      <Card elevation={5}>
        
      <Box
        className = "profile-banner"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
         
          bgColor:'primary.main',
          borderRadius: 1,
         
        }}
      >
         <Avatar
        alt={profile?.name}
        src={profile?.photo}
        sx={{ width: 75, height: 75 }}
      />
      </Box>
      <FlexBox m = {0}>
           <Typography variant='h5'> 
            {profile?.name}
              </Typography>
      </FlexBox>
     
       <FlexBox m = {1}>      
            <Typography variant='body2' >
              <em>  {profile?.bio} </em> 
            </Typography>
       </FlexBox>    
    {profile.uid=== (user?user.uid:'hehe') ? <UserControls /> : user? <Controls profileData = {profile} profileId = {profile.uid} followerId = {user.uid} followerData ={null} />: <AnonymousUserControls />}
      </Card>
      </Box> 
    </>
  );
}