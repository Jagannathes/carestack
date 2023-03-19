import UserSchema from '@/models/user';
import { withUser } from '@/utils/auth';
import connectDB from '@/utils/connect';

async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(400).json({ message: 'method not allowed' });
  try {
    await connectDB();
    const searchString = req.query.search;
    const query = searchString
      ? { name: { $regex: searchString, $options: 'i' } }
      : {};
    
    let users = await UserSchema.find(query);
    
    if(req.user){
    const userId = (await UserSchema.find({ uid: req.user.uid }))._id;
    users = users.map(user => {
        const isFriend = user?.friends?.includes(userId);
        return { ...user.toObject(), isfriend: isFriend };
      });
    }
    res.status(200).json({ message: 'users found', users });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error', err });
  }
}

export default withUser(handler);
