import {useRouter} from 'next/router'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import Container from '@mui/material/Container'
import {AuthContext} from '@/context/userContext';
import Banner from '@/components/Profile/Banner';
import FullPageLoader from "@/components/Loader/fullLoader";
import Tabs from '@/components/Profile/Tabs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { Masonry } from '@mui/lab';
import HomeCard from '@/components/Profile/card';
import Paper from '@mui/material/Paper';
export default function ProfilePage() {
const [profile, setProfile] = useState({});
const [tabStatus, setTabStatus] = useState(0);
const [masonryRow, setMasonryRow] = useState(2);
const [posts, setPosts] = useState([]);

const router = useRouter();
const {id} = router.query; 
const {user, loading,authToken } = useContext(AuthContext);
const matches = useMediaQuery('(max-width:600px)');

async function getUser(){
  try{
  
    const res = await axios.get(`/api/user/get?uid=${id}`, {
      headers: {
        "x-auth-token":authToken,
      }
    });
    console.log(res.data.user)
    setProfile(res.data.user);                                                     
     }catch(err){
         console.log(err);
         }
 }

useEffect(()=>{
  if(id && !loading){
  getUser();
  }
},[id, loading]);

useEffect(()=>{
  if(matches)
  {
    setMasonryRow(1);
  }
  else{
    setMasonryRow(2);
  }
},[matches]);



if(loading)
      return <FullPageLoader/>

return (
   <Paper elevation={0} sx={{height:"100%", flexGrow:1}}>
    <Container maxWidth = "lg" sx = {{mt : 2}}>
    <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 8 }}
          >
            <Grid item xs={2} sm={8} md={3.5} key={1}>
      <Banner profile={profile ?profile: user} />
            </Grid>
            <Grid item xs={2} sm={8} md={4.5} key={2}>
      <Tabs profile={profile || user} status = {tabStatus} setStatus ={setTabStatus}/>
      {   tabStatus === 0 &&
      <Masonry columns={masonryRow} spacing={1} sx ={{ml : 0.1, mt : 1}}  >
    {posts.map(post => (
        
    
        <HomeCard post={post} loading = {loading} authorIsUser = {1}/>


    ))}
        
       
        </Masonry>
            }           
             </Grid>
          </Grid>
        </Box>

    </Container>
   </Paper>
 
)
}