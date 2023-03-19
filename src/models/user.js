import mongoose from 'mongoose';
import './request'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  friends: 
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    }],
  
  invites:[{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'request',
  }]
});

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;