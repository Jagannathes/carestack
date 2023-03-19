import  PostSchema  from '@/models/user';
import { withAuth } from '@/utils/auth';

async function handler(req, res) {
  try {
    if (req.method == 'GET') {
      const posts = await PostSchema.findOne({ uid: req.user.uid });
      
        return res.status(200).json({ message: 'user found', _user })
    }

    else if(req.method == "POST"){
        const post = new PostSchema({
            uid: req.user.uid,
            email: req.user.email,
            name: req.user.displayName,
            photo: req.user.photoURL,
          });
          await post.save();
          return res.status(200).json({ message: 'post saved', _user })
    }
  } catch (err) {
    res.status(400).json({ message: 'error', err });
  }
}

export default withAuth(handler);
