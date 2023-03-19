import  UserSchema  from '@/models/user';
import '@/models/post';
import '@/models/request';
import { withAuth } from '@/utils/auth';
import connectDB from "@/utils/connect";

async function handler(req, res) {
  if (req.method !== 'GET') return res.status(400).json({ message: 'method not allowed' });
  try {
    await connectDB();
    const _user = await UserSchema.findOne({ uid: req.user.uid }).populate({path:'invites', model:'request'}).populate({path:'friends', model:'users'})
    
    if (_user) {
      return res.status(200).json({ message: 'user found', user: _user });
    }

    const user = new UserSchema({
      uid: req.user.uid,
      email: req.user.email,
      name: req.user.name,
      photo: req.user.picture,
    });
    await user.save();

    res.status(200).json({ message: 'user saved', user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error', err });
  }
}

export default withAuth(handler);
