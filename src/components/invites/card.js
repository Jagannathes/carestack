import React from 'react';
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
        disabled
      >
        Pending
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
  authToken,
  id
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);

  const acceptRequest = async () => {
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
      .put(
        '/api/request/accept',
        {
          sender,
          receiver,
          _id: id,
          status: 'accepted',
        },
        {
          headers: {
            'x-auth-token': authToken,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setIsAccepted(true);
      });
  };

  const declineRequest = () => {
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
      .put(
        `/api/request/accept`,
        {
          sender,
          receiver,
          id: id,
          status: 'declined',
        },
        {
          headers: {
            'x-auth-token': authToken,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setDeclined(true);
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
      {isAccepted ? (
        <Button
          variant="contained"
          color="success"
          sx={{
            mr: 2,
          }}
          onClick={() => {
            unFriendUser();
          }}
          disabled
        >
          Accepted
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{
            mr: 2,
          }}
          onClick={() => acceptRequest()}
        >
          Accept
        </Button>
      )}
      {!isAccepted &&
        (declined ? (
          <Button
            variant="contained"
            color="success"
            sx={{
              mr: 2,
            }}
          
            disabled
          >
            Accepted
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={() => declineRequest()}
          >
            decline
          </Button>
        ))}
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

function ProfileCard({ profile, userId, status ,id}) {
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
          {status === "send" ? (
            <UserControls user={user} />
          ) : (
            <Controls
              profileData={user}
              user={profile}
              FrienderData={null}
              authToken={authToken}
              id={id}
            />
          )}
        </Card>
      </Box>
    </>
  );
}

export default ProfileCard;
