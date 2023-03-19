import React from 'react';
import styles from './cards.module.css';
import { useContext, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { AuthContext } from '@/context/userContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';

const AnonymousUserControls = () => {
  return (
    <Box
      sx={{
        mt: 3,
        mb: 3,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          mr: 2,
        }}
        onClick={() => {
          alert('You need to login to Friend this user');
        }}
      >
        Friend
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={() => {
          alert('You need to login to be friends with this user');
        }}
      >
        Share
      </Button>
    </Box>
  );
};

const UserControls = ({ user }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        mt: 3,
        mb: 3,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          router.push(`/user/${user.uid}`);
        }}
      >
        Edit Profile
      </Button>
    </Box>
  );
};

const Controls = ({
  profileData,
  FrienderId,
  profileId,
  FrienderData,
  user,
  authToken
}) => {
  console.log(profileData)
  const [isFriend, setIsFriend] = useState(profileData.isfriend?true:(profileData.invited?"pending":false));

  useEffect(() => {
    if (FrienderId) {
      // getFriending(FrienderId, profileId).then(res=>{
      //   setIsFriending(res);
      // })
    }
  }, [FrienderId, profileId]);

  const FriendUser = async () => {
    let sender = {
      name: user.name,
      uid: user.uid,
      photo: user.photo,
      _id: user._id,
    };
    let receiver = {
      name: profileData.name,
      uid: profileData.uid,
      photo: profileData.photo,
      _id: profileData._id,
    };
    axios
      .post(
        '/api/request/send',
        {
          sender,
          receiver,
        },
        {
          headers: {
            'x-auth-token': authToken,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setIsFriend('pending');
      });
  };

  const unFriendUser = () => {
    axios
      .delete(`/api/friend?uid=${profileId}&FrienderId=${FrienderId}`)
      .then((res) => {
        console.log(res.data);
        setIsFriending(!res.data.success);
      });
  };

  return (
    <Box
      sx={{
        mt: 3,
        mb: 3,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {isFriend ? (
        isFriend === 'pending' ? (
          <Button variant="contained" color="primary" sx={{
            mr: 2,
          }}disabled>
            PENDING
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            sx={{
              mr: 2,
            }}
            onClick={() => {
              unFriendUser();
            }}
          >
            UNFRIEND
          </Button>
        )
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{
            mr: 2,
          }}
          onClick={() => {
            FriendUser();
          }}
        >
          FRIEND
        </Button>
      )}
      <Button variant="contained" color="error">
        Share
      </Button>
    </Box>
  );
};

const FlexBox = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        m: props.m,

        borderRadius: 1,
      }}
    >
      {props.children}
    </Box>
  );
};

function ProfileCard({ profile, userId }) {
  const router = useRouter();
  const { user, authToken } = useContext(AuthContext);
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Card elevation={5}>
          <Box
            onClick={() => {
              router.push(`/user/${profile.uid}`);
            }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              bgcolor: ``,

              borderRadius: 1,
            }}
          >
            <Avatar
              alt={profile?.name}
              src={profile?.photo}
              sx={{ width: 75, height: 75 }}
            />
          </Box>
          <FlexBox m={0}>
            <Typography variant="h5">{profile?.name}</Typography>
          </FlexBox>

          <FlexBox m={1}>
            <Typography variant="body2">
              <em> {profile?.bio} </em>
            </Typography>
          </FlexBox>
          {profile.uid === (user ? user.uid : 'hehe') ? (
            <UserControls user={user} />
          ) : user ? (
            <Controls
              profileData={profile}
              profileId={profile._id}
              FrienderId={user._id}
              user={user}
              FrienderData={null}
              authToken={authToken}
            />
          ) : (
            <AnonymousUserControls />
          )}
        </Card>
      </Box>
    </>
  );
}

export default ProfileCard;
