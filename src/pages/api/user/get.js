import  UserSchema  from '@/models/user';
import '@/models/post';
import { withUser } from '@/utils/auth';
import connectDB from "@/utils/connect";

async function handler(req, res) {
  if (req.method !== 'GET') return res.status(400).json({ message: 'method not allowed' });
  try {
    await connectDB();
    const _user = await UserSchema.findOne({ uid: req.query.uid }).populate('friends').populate('posts');
    if(req.user){
        if(_user._id==req.user._id){
            return res.status(200).json({ message: 'user found', user: _user });
        }
        else{
            const friendId = req.user._id;
            const mutualFriends = await UserSchema.find({
                _id: { $ne: friendId, $in: _user.friends },
                friends: { $elemMatch: { $eq: friendId } },
              });
              console.log(mutualFriends)
              _user.friends = mutualFriends;

              return res.status(200).json({ message: 'user found', user: _user });
        }
    }
    else{
        
        return res.status(200).json({ message: 'user found', user: _user });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error', err });
  }
}

export default withUser(handler);